import TftSummonersRepository from "./repositories/tftSummoners";
import VectorDBPool from "./common/pool";
import TftMatchesRepository from "@/repositories/tftMatches";
import TftCompositonsRepository from "@/repositories/tftCompositons";
import TftCompositionTraitsRepository from "@/repositories/tftCompositionTraits";
import TftCompositionItemsRepository from "@/repositories/tftCompositionItems";
import TftCompositionAugmentsRepository from "@/repositories/tftCompositionAugments";
import { TftCompositionChampionsRepository } from "@/repositories/tftCompositionChampions";
import RiotSummonerService from "@/services/summoner";
import RiotMatchService from "@/services/match";
import { LeagueEntry } from "@/domain/types/leagueEntry";
import { MatchResponse } from "@/domain/types/match";
import ItemsMappingManager from "@/domain/mappings/items";
import AugmentsMappingManager from "@/domain/mappings/augments";
import CompositionVectorCalculator from "@/logics/compositionVectorCalculator";
import ChampionsMappingManager from "@/domain/mappings/champions";
import TraitsMappingManager from "@/domain/mappings/traits";
import TftMatchEntity from "@/domain/entities/tftMatch";
import EnvironmentProvider from "@/common/environmentProvider";
import { Parameters } from "@/domain/enums/parameters";
import { SQSEvent } from "@/domain/types/sqsEvent";
import { CloudWatchMetrics } from "@/common/cloudWatchMetrics";
import { Metrics } from "@/domain/enums/metrics";

export const handler = async (event: SQSEvent | object,context: object) => {

  const [
    postgreHost,
    postgrePort,
    postgreUser,
    postgrePassword,
    postgreDatabase,
    riotApiKey,
    matchServiceRegion,
    summonerServiceRegion,
    tftSetVersion,
    username
  ] = await Promise.all([
    EnvironmentProvider.get(Parameters.POSTGRES_HOST),
    EnvironmentProvider.get(Parameters.POSTGRES_PORT),
    EnvironmentProvider.get(Parameters.POSTGRES_USER),
    EnvironmentProvider.get(Parameters.POSTGRES_PASSWORD),
    EnvironmentProvider.get(Parameters.POSTGRES_DB),
    EnvironmentProvider.get(Parameters.RIOT_API_KEY),
    EnvironmentProvider.get(Parameters.MATCH_SERVICE_REGION),
    EnvironmentProvider.get(Parameters.SUMMONER_SERVICE_REGION),
    EnvironmentProvider.get(Parameters.TFT_SET_VERSION),
    EnvironmentProvider.get(Parameters.TFT_USERNAME),
  ]);


  VectorDBPool.getInstance({
    host: postgreHost! as string,
    port: Number.parseInt(postgrePort! as string),
    user: postgreUser! as string,
    password: postgrePassword! as string,
    database: postgreDatabase! as string,
    // Prevents errors causing from RDS connection. RDS has obligation of using SSL.
    ssl: {
      rejectUnauthorized: false,
    },

  })

  const cloudWatch = new CloudWatchMetrics();

  const tftSummonersRepository = new TftSummonersRepository();
  const tftMatchRepository = new TftMatchesRepository();
  const tftCompositionsRepository = new TftCompositonsRepository();
  const tftCompositionChampionsRepository = new TftCompositionChampionsRepository();
  const tftCompositionAugmentsRepository = new TftCompositionAugmentsRepository();
  const tftCompositionItemsRepository = new TftCompositionItemsRepository();
  const tftCompositionTraitsRepository = new TftCompositionTraitsRepository();
  const riotMatchService = new RiotMatchService(riotApiKey! as string,matchServiceRegion! as string);
  const riotSummonerService = new RiotSummonerService(riotApiKey! as string,summonerServiceRegion! as string);

  const itemsMappingManager = new ItemsMappingManager(tftSetVersion! as string);
  const augmentsMappingManager = new AugmentsMappingManager(tftSetVersion! as string);
  const championsMappingManager = new ChampionsMappingManager(tftSetVersion! as string);
  const traitsMappingManager = new TraitsMappingManager(tftSetVersion! as string);

  await itemsMappingManager.initializeMappings();
  await augmentsMappingManager.initializeMappings();
  await championsMappingManager.initializeMappings();
  await traitsMappingManager.initializeMappings();
  const compositionVectorCalculator = new CompositionVectorCalculator(traitsMappingManager);

  const iteration = {
    start:0,
    count:20,
    isFinished: false
  }

  const summonerTiers : {
    [key: string]: string
  } = {}

  const fallbackTier = "PLATINUM";

  let leagueEntries: LeagueEntry[];
  if(username){
    leagueEntries = await riotSummonerService.getSummonerDetailsFromSummonerName(username as string);
    try{
      if(!leagueEntries || leagueEntries.length === 0) {
        throw new Error("Summoner with username " + username + " not found");
      }
    }catch{
      summonerTiers[username as string] = "PLATINUM";
    }

  }else {
    const summoner = await tftSummonersRepository.getRandomSummoner();
    if(!summoner) {
      throw new Error("No summoner found");
    }
    leagueEntries = await riotSummonerService.getSummonerDetailsFromSummonerId(summoner.summonerid);
  }
  const tftEntry = leagueEntries.find((entry) => entry.queueType === "RANKED_TFT");
  let puuid = "";
  if(tftEntry === undefined){
    const summoner = await tftSummonersRepository.getSummonerBySummonerName(username as string);
    if(!summoner) {
      throw new Error("Summoner with username " + username + " not found");
    }
    puuid = summoner.summonerpuuid;
  }else {
    puuid = tftEntry.puuid;
    console.info("Fetching matches for " + tftEntry.summonerName + " " + tftEntry.tier + " " + tftEntry.rank + " " + tftEntry.leaguePoints + "LP");
  }

  while (!iteration.isFinished){
    const matchList = await riotMatchService.getMatchIdsByPuuid(puuid, iteration.start, iteration.count);
    if(matchList.length === 0) {
      iteration.isFinished = true;
      break;
    }

    const matches = await tftMatchRepository.getMultipleMatchesByMatchIds(matchList);
    if(matches.length === matchList.length) {
      iteration.isFinished = true;
      break;
    }

    const notAddedMatches = matchList.filter((matchId) => !matches.some((match) => match.matchid === matchId))

    for(const matchId of notAddedMatches) {
      const transactionStartTime = performance.now();
      const transaction = await VectorDBPool.getInstance().getClient();

      try{
          const matchDetails = await riotMatchService.getMatchDetailsByMatchId(matchId) as unknown as MatchResponse;
          const {
            metadata,
            info
          } = matchDetails;
          const {
            participants: compositions,tft_set_core_name: matchTftSet, game_length, tft_game_type
          } = info;


          const { participants } = metadata;
          await transaction.query("BEGIN");

          const tftMatch = {
            matchid: matchId,
            participants: participants,
            tftset: tftSetVersion,
            gamelength: Math.round(game_length),
            gametype: tft_game_type,
            metadata: metadata
          } as TftMatchEntity;
          await tftMatchRepository.insertMatch(tftMatch, transaction);
          if(matchTftSet !== tftSetVersion || tft_game_type !== "standard") {
            continue;
          }

          for( const participantPuuid of participants) {
            let summoner = await tftSummonersRepository.getSummonerByPuuid(participantPuuid);
            if(!summoner){
              const summonerDetails = await riotSummonerService.getSummonerByPuuid(participantPuuid);
              summoner = {
                summonerid: summonerDetails.id,
                summonerpuuid: summonerDetails.puuid,
                summonername: summonerDetails.name,
              }
              await tftSummonersRepository.insertSummoner(summoner);
            }
            if(summonerTiers[summoner.summonerpuuid] === undefined) {
              const leagueEntry = await riotSummonerService.getSummonerDetailsFromSummonerName(summoner.summonername);
              const tftEntry = leagueEntry.find((entry) => entry.queueType === "RANKED_TFT");
              if (tftEntry === undefined) {
                summonerTiers[summoner!.summonerpuuid] = fallbackTier;
              }
              else {
                const { tier:summonerTier } = tftEntry;
                summonerTiers[summoner!.summonerpuuid] = summonerTier;
              }
            }

            const composition = compositions.find((composition) => composition.puuid === participantPuuid);
            if(!composition) {
              throw new Error("No composition found for " + participantPuuid);
            }
            const {
              placement,
              level,
              last_round,
              time_eliminated,
              total_damage_to_players,
              players_eliminated,
              gold_left,
              traits,
              units,
              augments
            } = composition;
            const compVector = compositionVectorCalculator.calculateVector(traits);
            // Add all composition augments to the database
            // Commit transactions

            await tftCompositionsRepository.insertComposition(
              {
                summonerpuuid: summoner!.summonerpuuid,
                matchid: matchId,
                composition: composition,
                compvector: compVector,
                playerlevel: level,
                placement: placement,
                totaldamagetoplayers: total_damage_to_players,
                tftset: tftSetVersion!,
                summonertier: summonerTiers[summoner!.summonerpuuid]
              },transaction);

            await Promise.all(units.map(async (unit) => {
              const { character_id, rarity,itemNames, tier } = unit;
              const championName = championsMappingManager.convertStringToName(character_id);
              const championItems = itemNames.map((itemName) => itemsMappingManager.convertStringToName(itemName));
              const champion = {
                summonerpuuid: summoner!.summonerpuuid,
                matchid: matchId,
                championname: championName,
                summonertier: summonerTiers[summoner!.summonerpuuid],
                placement: placement,
                tftset: tftSetVersion!,
                championtier: tier
              };
              await tftCompositionChampionsRepository.insertChampion(champion, transaction);

              await Promise.all(championItems.map(async (item) => {
                const itemEntity = {
                  summonerpuuid: summoner!.summonerpuuid,
                  matchid: matchId,
                  itemname: item,
                  placement: placement,
                  championname: championName,
                  tftset: tftSetVersion!,
                  summonertier: summonerTiers[summoner!.summonerpuuid]
                };
                await tftCompositionItemsRepository.insertItem(itemEntity, transaction);
              }));

            }));

            await Promise.all(traits.map(async (trait) => {
              const { name, num_units, style, tier_current, tier_total } = trait;
              const traitName = traitsMappingManager.convertStringToName(name);
              const traitEntity = {
                summonerpuuid: summoner!.summonerpuuid,
                matchid: matchId,
                traitname: traitName,
                traittier: num_units,
                placement,
                tftset: tftSetVersion!,
                summonertier: summonerTiers[summoner!.summonerpuuid]
              };
              await tftCompositionTraitsRepository.insertTrait(traitEntity, transaction);
              }));
            await Promise.all(augments.map(async (augment) => {
                const augmentName = augmentsMappingManager.convertStringToName(augment);
                const augmentEntity = {
                    summonerpuuid: summoner!.summonerpuuid,
                    matchid: matchId,
                    augmentname: augmentName,
                    placement,
                    tftset: tftSetVersion!,
                    summonertier: summonerTiers[summoner!.summonerpuuid]
                };
                await tftCompositionAugmentsRepository.insertAugment(augmentEntity, transaction);
                }));
          }
          await transaction.query("COMMIT");
          const transactionEndTime = performance.now();
          const transactionDuration = transactionEndTime - transactionStartTime;
          await cloudWatch.sendDurationMetric(Metrics.TRANSACTION_DURATIONS,transactionDuration);
          await cloudWatch.sendCountMetric(Metrics.SUCCESSFUL_TRANSACTIONS);
          console.info("Added match " + matchId);
        }
      catch (error) {
        console.error(error);
        await transaction.query("ROLLBACK");
        await cloudWatch.sendCountMetric(Metrics.FAILED_TRANSACTIONS);

      }finally{
        transaction.release();
      }

    }


    iteration.start += iteration.count;
  }


}

