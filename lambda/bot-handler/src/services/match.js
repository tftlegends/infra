const {RiotAPI} = require('@fightmegg/riot-api');
const matchJson = require('./match.json');
const {RiotAPITypes: {TFTCluster}} = require("@fightmegg/riot-api");


class TftLegendsMatchService {

  constructor(apiKey, region){
    this.rAPI = new RiotAPI(apiKey);
    this.region = region;
  }

  async fetchMatch(matchId) {
    return this.rAPI.tftMatch.getById({
      region:this.region,
      matchId:matchId
    })

  }

  async fetchUser(puuid) {
    return this.rAPI.tftSummoner.getByPUUID({
      region:this.region,
      puuid:puuid
    }).catch(console.error)
  }

  getUserFromSummonerName(summonerName) {
    return this.rAPI.tftSummoner.getBySummonerName({
      region:this.region,
      summonerName:summonerName
    }).catch(console.error)
  }

  getPuuidFromSummonerName(summonerName) {
    return this.getUserFromSummonerName(summonerName).then((user) => {
      return user.puuid;
    }).catch(console.error);
  }

  getMatchIdsByPuuid(puuid, start, count) {
    return this.rAPI.tftMatch.getMatchIdsByPUUID({
      region:this.region,
      puuid:puuid,
      params: {
        start:start,
        count
      }
    }).catch(console.error)
  }

  getMatchById(matchId) {
    return this.rAPI.tftMatch.getById({
      region:this.region,
      matchId:matchId
    }).catch(console.error)
  }

}

module.exports = TftLegendsMatchService;
