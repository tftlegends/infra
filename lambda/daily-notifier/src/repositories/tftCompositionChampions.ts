import Repository from "@/common/repository";
import TftCompositionChampionEntity from "@/domain/entities/tftCompositionChampion";
import { PoolClient } from "pg";

export class TftCompositionChampionsRepository extends Repository{
  constructor() {
    super();
  }

  async insertChampion(champion : TftCompositionChampionEntity, transaction? : PoolClient): Promise<TftCompositionChampionEntity>{
    const client = transaction || await this.pool.getClient();

    const query = {
      text: "INSERT INTO TftCompositionChampions (summonerPuuid, matchId, championName, summonerTier, placement, championTier, tftSet) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      values: [champion.summonerpuuid, champion.matchid, champion.championname, champion.summonertier, champion.placement, champion.championtier, champion.tftset]
    };
    await client.query(query);
    if(!transaction) client.release();
    return champion;
  }

  async getChampionsBySummonerPuuid(summonerPuuid: string): Promise<TftCompositionChampionEntity[]> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftCompositionChampions WHERE summonerPuuid = $1',
      values: [summonerPuuid]
    };
    const result = await client.query(query);
    client.release();
    return result.rows as TftCompositionChampionEntity[];
  }

  async getChampionsBySummonerTier(summonerTier: string): Promise<TftCompositionChampionEntity[]> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftCompositionChampions WHERE summonerTier = $1',
      values: [summonerTier]
    };
    const result = await client.query(query);
    client.release();
    return result.rows as TftCompositionChampionEntity[];
  }

  async getChampionsByName(championName: string): Promise<TftCompositionChampionEntity[]> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftCompositionChampions WHERE championName = $1',
      values: [championName]
    };
    const result = await client.query(query);
    client.release();
    return result.rows as TftCompositionChampionEntity[];
  }
}
