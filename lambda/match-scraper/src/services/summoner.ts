import { RiotAPI, RiotAPITypes } from "@fightmegg/riot-api";
import LoLRegion = RiotAPITypes.LoLRegion;
import { Summoner } from "@/domain/types/summoner";
import { LeagueEntry } from "@/domain/types/leagueEntry";


export default class TftLegendsSummonerService {
  private readonly rAPI: RiotAPI;
  private readonly region: string;

  constructor(apiKey: string, region: string) {
    this.rAPI = new RiotAPI(apiKey);
    this.region = region;
  }

  async fetchUser(puuid: string): Promise<Summoner> {
    return this.rAPI.tftSummoner.getByPUUID({
      region: this.region as LoLRegion, puuid: puuid
    }) as Promise<Summoner>;
  }

  getUserFromSummonerName(summonerName: string): Promise<Summoner> {
    return this.rAPI.tftSummoner.getBySummonerName({
      region: this.region as LoLRegion, summonerName: summonerName
    }) as Promise<Summoner>;
  }

  getPuuidFromSummonerName(summonerName: string): Promise<string> {
    return this.getUserFromSummonerName(summonerName).then((user) => {
      return user.puuid;
    }) as Promise<string>;
  }

  async getSummonerDetailsFromSummonerName(summonerName: string): Promise<LeagueEntry[]> {
    const { id } = await this.getUserFromSummonerName(summonerName);
    return this.rAPI.tftLeague.getEntriesBySummonerId({
      region: this.region as LoLRegion, summonerId: id
    }) as Promise<LeagueEntry[]>;
  }

  async getSummonerDetailsFromSummonerId(summonerId: string): Promise<LeagueEntry[]> {
    return this.rAPI.tftLeague.getEntriesBySummonerId({
      region: this.region as LoLRegion, summonerId: summonerId
    }) as Promise<LeagueEntry[]>;
  }


}

