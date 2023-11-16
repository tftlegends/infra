import TftSummonerEntity from "@/domain/entities/tftSummoner";
import Repository from "@/common/repository";
import { PoolClient } from "pg";

export default class TftSummonersRepository extends Repository {

  constructor() {
    super();
  }
  async getSummonerByPuuid(puuid: string): Promise<TftSummonerEntity | null> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftSummoners WHERE summonerPuuid = $1',
      values: [puuid]
    };
    const result = await client.query(query);
    client.release();
    if(result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as TftSummonerEntity;

  }

  async insertSummoner(summoner: TftSummonerEntity, transaction? : PoolClient): Promise<TftSummonerEntity> {
    const client = transaction || await this.pool.getClient();
    const query = {
      text: 'INSERT INTO TftSummoners(summonerPuuid, summonerName, summonerId) VALUES($1, $2, $3) RETURNING *',
      values: [summoner.summonerpuuid, summoner.summonername, summoner.summonerid]
    };
    const result = await client.query(query);
    if(!transaction) client.release();
    return result.rows[0] as TftSummonerEntity;
  }

  async getSummonerBySummonerName(summonerName: string): Promise<TftSummonerEntity | null> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftSummoners WHERE summonerName = $1',
      values: [summonerName]
    };
    const result = await client.query(query);
    client.release();
    if(result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as TftSummonerEntity;
  }

  async getSummonerBySummonerId(summonerId: string): Promise<TftSummonerEntity | null> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftSummoners WHERE summonerId = $1',
      values: [summonerId]
    };
    const result = await client.query(query);
    client.release();
    if(result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as TftSummonerEntity;
  }

  async getRandomSummoner(): Promise<TftSummonerEntity | null> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftSummoners ORDER BY RANDOM() LIMIT 1',
      values: []
    };
    const result = await client.query(query);
    client.release();
    if(result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as TftSummonerEntity;
  }
}
