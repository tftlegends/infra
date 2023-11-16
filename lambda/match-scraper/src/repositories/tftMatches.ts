import Repository from "@/common/repository";
import { PoolClient } from "pg";
import TftMatchEntity from "@/domain/entities/tftMatch";

export default class TftMatchesRepository extends Repository {
  constructor() {
    super();
  }

  async getMatchByMatchId(matchId: string): Promise<TftMatchEntity | null> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftMatches WHERE matchId = $1',
      values: [matchId]
    };
    const result = await client.query(query);
    client.release();
    if(result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as TftMatchEntity;
  }

  async insertMatch(match: TftMatchEntity, transaction?:PoolClient): Promise<TftMatchEntity> {
    const client = transaction || await this.pool.getClient();
    const query = {
      text: 'INSERT INTO TftMatches(matchId, participants, tftSet, gameLength, gameType, metadata) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [match.matchid, match.participants, match.tftset, match.gamelength, match.gametype, JSON.stringify(match.metadata)]
    };
    const result = await client.query(query);
    if(!transaction) client.release();
    return result.rows[0] as TftMatchEntity;
  }

  async deleteMatchById(matchId: string): Promise<void> {
    const client = await this.pool.getClient();
    const query = {
      text: 'DELETE FROM TftMatches WHERE matchId = $1',
      values: [matchId]
    };
    await client.query(query);
    client.release();
  }
}
