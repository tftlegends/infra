import TftSummonerEntity from "@/domain/entities/tftSummoner";
import Repository from "@/common/repository";

export default class TftSummonerRepository extends Repository {

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

  async createSummoner(summoner: TftSummonerEntity): Promise<TftSummonerEntity> {
    const client = await this.pool.getClient();
    const query = {
      text: 'INSERT INTO TftSummoners(summonerPuuid, summonerName, summonerId) VALUES($1, $2, $3) RETURNING *',
      values: [summoner.summonerPuuid, summoner.summonerName, summoner.summonerId]
    };
    const result = await client.query(query);
    client.release();
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
}
