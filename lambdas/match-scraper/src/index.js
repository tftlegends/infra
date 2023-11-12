const TftLegendsMatchService = require('./services/match');
const TftMatchRepository = require('./repositories/tft-match');
const {config} = require('dotenv')
const allTraits = require('./domain/enums/traits')
config();

const matchService = new TftLegendsMatchService(process.env.RIOT_API_KEY, process.env.RIOT_REGION);
const tftMatchRepository = new TftMatchRepository({
  port : process.env.POSTGRES_PORT,
  host : process.env.POSTGRES_HOST,
  user : process.env.POSTGRES_USER,
  password : process.env.POSTGRES_PASSWORD,
  database : process.env.POSTGRES_DATABASE,
});
const main = async (matchId) => {


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
          const user = await matchService.fetchUser(puuid);
          const {summonerName} = user;
          await tftMatchRepository.createUser(puuid,summonerName)
        }
        await tftMatchRepository.insertComposition(composition,transaction);
      })
    ]);
  }catch (e) {
    await tftMatchRepository.rollbackTransaction(transaction);
    throw e;
  }
  await tftMatchRepository.commitTransaction(transaction);




}

const matchId = 'TR1_1467296989'
main(matchId)
