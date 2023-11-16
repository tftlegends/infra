import { config } from 'dotenv'
config();
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

VectorDBPool.getInstance({
  host: process.env.POSTGRES_HOST!,
  port: Number.parseInt(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2000,
})

const tftSummonersRepository = new TftSummonersRepository();
const tftMatchRepository = new TftMatchesRepository();
const tftCompositionsRepository = new TftCompositonsRepository();
const tftCompositionChampionsRepository = new TftCompositionChampionsRepository();
const tftCompositionAugmentsRepository = new TftCompositionAugmentsRepository();
const tftCompositionItemsRepository = new TftCompositionItemsRepository();
const tftCompositionTraitsRepository = new TftCompositionTraitsRepository();
const riotMatchService = new RiotMatchService(process.env.RIOT_API_KEY!, process.env.MATCH_SERVICE_REGION!)
const riotSummonerService = new RiotSummonerService(process.env.RIOT_API_KEY!,process.env.SUMMONER_SERVICE_REGION!);
const username = process.env.TFT_USERNAME;
const tftSetVersion = process.env.TFT_SET_VERSION;

const itemsMappingManager = new ItemsMappingManager(tftSetVersion!);
const augmentsMappingManager = new AugmentsMappingManager(tftSetVersion!);
const championsMappingManager = new ChampionsMappingManager(tftSetVersion!);
const traitsMappingManager = new TraitsMappingManager(tftSetVersion!);
const main = async () => {

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

  let leagueEntries: LeagueEntry[];
  if(username){
    leagueEntries = await riotSummonerService.getSummonerDetailsFromSummonerName(username);
    if(!leagueEntries || leagueEntries.length === 0) {
      throw new Error("Summoner with username " + username + " not found");
    }
  }else {
    const summoner = await tftSummonersRepository.getRandomSummoner();
    if(!summoner) {
      throw new Error("No summoner found");
    }
    leagueEntries = await riotSummonerService.getSummonerDetailsFromSummonerId(summoner.summonerid);
  }
  const tftEntry = leagueEntries.find((entry) => entry.queueType === "RANKED_TFT");
  if(tftEntry === undefined) {
    throw new Error("No TFT entry found");
  }
  const fallbackTier = tftEntry.tier;
  console.info("Fetching matches for " + tftEntry.summonerName + " " + tftEntry.tier + " " + tftEntry.rank + " " + tftEntry.leaguePoints + "LP");
  const {
    puuid
  } = tftEntry;

  while (!iteration.isFinished){
    const matchList = await riotMatchService.getMatchIdsByPuuid(puuid, iteration.start, iteration.count);
    if(matchList.length === 0) {
      iteration.isFinished = true;
      break;
    }

    for(const matchId of matchList) {

      const transaction = await VectorDBPool.getInstance().getClient();

      try{
        const match = await tftMatchRepository.getMatchByMatchId(matchId);
        if(!match) {
          const matchDetails = await riotMatchService.getMatchDetailsByMatchId(matchId) as unknown as MatchResponse;
          const {
            metadata,
            info
          } = matchDetails;
          const {
            participants: compositions,tft_set_core_name: matchTftSet, game_length, tft_game_type
          } = info;

          if(matchTftSet !== tftSetVersion) {
            continue;
          }
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


          }
          await transaction.query("COMMIT");
          console.info("Added match " + matchId);

        }
      catch (error) {
        console.error(error);
        await transaction.query("ROLLBACK");
      }finally{}

    }


    iteration.start += iteration.count;
  }


}

main();
