import { PoolClient } from "pg";
import Repository from "@TftLegends/Common/Repositories/Repository";
import TftCompositionAugmentEntity from "@TftLegends/Common/Entities/TftCompositionAugment";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";

export class AugmentsRepository extends Repository {
  constructor() {
    super();
  }

  async insertAugment(augment: TftCompositionAugmentEntity, transaction?: PoolClient): Promise<TftCompositionAugmentEntity> {
    const client = transaction || await this.pool.getClient();
    const query = {
      text: 'INSERT INTO TftCompositionAugments(summonerPuuid, matchId, augmentName, summonerTier, placement, tftSet) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [augment.summonerpuuid, augment.matchid, augment.augmentname, augment.summonertier, augment.placement, augment.tftset]
    };
    await client.query(query);
    if(!transaction) client.release();
    return augment;
  }

  async getAugmentsByPrimaryKey(summonerPuuid: string, matchId: string): Promise<TftCompositionAugmentEntity[]> {
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT * FROM TftCompositionAugments WHERE summonerPuuid = $1 AND matchId = $2',
      values: [summonerPuuid, matchId]
    };
    const response = await client.query(query);
    client.release();
    return response.rows;
  }

  async getBestAugmentsStats(statsRequest: BaseStatsRequest) {
    const { limit, placement, tftSet, tftTier } = statsRequest;
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT augmentName, COUNT(augmentName) FROM TftCompositionAugments WHERE placement <= $1 AND tftSet = $2 AND summonerTier = $3 GROUP BY augmentName ORDER BY COUNT(augmentName) DESC LIMIT $4',
      values: [placement, tftSet, tftTier, limit]
    }
    const response = await client.query(query);
    client.release();
    return response.rows as TftCompositionAugmentEntity[];
  }

  async getWorstAugmentsStats(statsRequest: BaseStatsRequest){
    const { limit, placement, tftSet, tftTier } = statsRequest;
    const client = await this.pool.getClient();
    const query = {
      text: 'SELECT augmentName, COUNT(augmentName) FROM TftCompositionAugments WHERE placement >= $1 AND tftSet = $2 AND summonerTier = $3 GROUP BY augmentName ORDER BY COUNT(augmentName) ASC LIMIT $4',
      values: [placement, tftSet, tftTier, limit]
    }
    const response = await client.query(query);
    client.release();
    return response.rows as TftCompositionAugmentEntity[];
  }



}
