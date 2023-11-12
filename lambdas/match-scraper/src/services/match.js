const {RiotAPI} = require('@fightmegg/riot-api');
const matchJson = require('./match.json');
const {RiotAPITypes: {TFTCluster}} = require("@fightmegg/riot-api");


class TftLegendsMatchService {

  constructor(apiKey, region){
    this.rAPI = new RiotAPI(apiKey);
    this.region = region;
  }

  async fetchMatch(matchId) {
    return matchJson;
    // TODO: Uncomment this on production.
    /*
    return this.rAPI.tftMatch.getById({
      region:this.region as TFTCluster,
      matchId:matchId
    })

     */
  }

  async fetchUser(puuid) {
    return this.rAPI.tftSummoner.getByPUUID({
      region:this.region,
      puuid:puuid
    }).catch(console.error)
  }
}

module.exports = TftLegendsMatchService;
