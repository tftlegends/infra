const TftLegendsMatchService = require('./services/match');
const TftMatchRepository = require('./repositories/tft-match');
const TftLegendsSummonerService = require('./services/summoner');
const {config} = require('dotenv')
const allTraits = require('./domain/enums/traits')
const SpecialEventLogic = require("./logics/special-event");
config();

const matchService = new TftLegendsMatchService(process.env.RIOT_API_KEY, process.env.MATCH_SERVICE_REGION);
const summonerService = new TftLegendsSummonerService(process.env.RIOT_API_KEY, process.env.SUMMONER_SERVICE_REGION);
const tftMatchRepository = new TftMatchRepository({
  port : process.env.POSTGRES_PORT,
  host : process.env.POSTGRES_HOST,
  user : process.env.POSTGRES_USER,
  password : process.env.POSTGRES_PASSWORD,
  database : process.env.POSTGRES_DATABASE,
});


const addMatch = async (matchId) => {
  const match = await matchService.fetchMatch(matchId);
  const {metadata, info} = match;
  const {participants: playerComps} = info;

  const {tft_set_core_name: tftSet, game_length:gameLength, tft_game_type:gameType} = info;
  const {participants} = metadata;
  const matchEntity = {
    matchId,
    participants,
    tftSet,
    gameLength,
    gameType,
    metadata:match
  }
  const compositions = playerComps.map((playerComp) => {
    const {traits} = playerComp;
    const compVector = new Array(32).fill(0);
    traits.forEach((trait) => {
      const {name,num_units} = trait;
      const index = allTraits[name]
      compVector[index] = num_units;
    });
    return{
      puuid:playerComp.puuid,
      matchId,
      composition:playerComp,
      compVector,
      playerLevel:playerComp.level,
      placement:playerComp.placement,
      totalDamageToPlayers:playerComp.total_damage_to_players,
      tftSet
    };
  });

  const transaction = await tftMatchRepository.startTransaction();
  try{
    await tftMatchRepository.insertMatch(matchEntity,transaction);
    await Promise.all([
      ...compositions.map(async(composition) =>{
        const puuid = composition.puuid;
        const userExists = await tftMatchRepository.checkUserExists(puuid);
        if(!userExists){
          await tftMatchRepository.createUser(puuid,undefined);
        }
        SpecialEventLogic.filterSpecialEvent(matchId,composition.composition.units);
        await tftMatchRepository.insertComposition(composition,transaction);
      })
    ]);
  }catch (e) {
    await tftMatchRepository.rollbackTransaction(transaction);
    throw e;
  }
  await tftMatchRepository.commitTransaction(transaction);


}

const main = async () => {
  let start = 0;
  let count = 20;
  let totalMatchesUploaded = 0;
  try{


  const randomUser = await tftMatchRepository.getRandomUser();
  const {puuid:userPuuid,summonerName} = randomUser;
  console.log(`Starting to download matches for ${summonerName} (${userPuuid})`);

  const isAllMatchesDownloaded = false;
  while(!isAllMatchesDownloaded) {
    const matchIds = await matchService.getMatchIdsByPuuid(userPuuid, start, count);
    const availableMatches = [];

    for (let i = 0; i < matchIds.length; i++) {
      const matchId = matchIds[i];
      const matchExists = await tftMatchRepository.checkMatchExists(matchId);
      // Checks if all matches are downloaded.
      // If not, it will proceed to download the match.
      if (matchExists) {
        availableMatches.push(true);
      } else {
        try{
          await addMatch(matchId).catch(console.error);
          totalMatchesUploaded++;
          availableMatches.push(false);
        }catch(e){
          availableMatches.push(true);
          console.log(`${matchId} is not added. Error: ${e.message}`)

        }
      }

      if (matchIds.length === count) {
        // If every match has been downloaded, we don't need to continue.
        if(availableMatches.every((matchId) => matchId === true)){
          break;
        }else{
          start += count;
        }
      } else {
        break;
      }

    }
  }
  }catch(e){
    console.error(e);
  }finally {
    console.log("Total matches uploaded: " + totalMatchesUploaded);
    console.log("Total matches skipped: " + (start - totalMatchesUploaded));
    console.log("Total matches: " + start);
  }


}

main();
