import { RiotAPI, RiotAPITypes } from "@fightmegg/riot-api";
import TFTCluster = RiotAPITypes.TFTCluster;


export default class RiotMatchService {
  private readonly rAPI: RiotAPI;
  private readonly region: string;

  constructor(apiKey: string, region: string) {
    this.rAPI = new RiotAPI(apiKey);
    this.region = region;
  }

  async fetchMatch(matchId: string) {
    return this.rAPI.tftMatch.getById({
      region: this.region as TFTCluster, matchId: matchId
    })
  }

  getMatchIdsByPuuid(puuid: string, start: number, count: number) {
    return this.rAPI.tftMatch.getMatchIdsByPUUID({
      region: this.region as TFTCluster, puuid: puuid, params: {
        start: start, count
      }
    })
  }

  async getMatchDetailsByMatchId(matchId : string) {
    return await this.rAPI.tftMatch.getById({
      region: this.region as TFTCluster, matchId: matchId
    }) ;
  }

}

