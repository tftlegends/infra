import { PoolClient } from "pg";
import Repository from "@TftLegends/Common/Repositories/Repository";
import TftCompositionAugmentEntity from "@TftLegends/Common/Entities/TftCompositionAugment";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import { Injectable } from "@nestjs/common";

@Injectable()
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
    const { limit = DefaultValue.LIMIT, placement = DefaultValue.LIMIT, tftSet = DefaultValue.TFT_SET, tftTier = DefaultValue.TFT_TIER } = statsRequest;
    const client = await this.pool.getClient();
    const query = `
        SELECT
    augmentName,
    COUNT(*) AS totalGames,
    SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) AS topFour,
    ROUND(CAST(SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS DECIMAL) / NULLIF(COUNT(*), 0), 2) AS winProbability,
    ROUND(CAST(SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) AS DECIMAL) / NULLIF(COUNT(*), 0), 2) AS topFourProbability
FROM
    TftCompositionAugments
WHERE
    tftSet = '${tftSet}' AND summonerTier = '${tftTier}'
GROUP BY
    augmentName
ORDER BY
    winProbability DESC, topFourProbability DESC
LIMIT ${limit}
    `

    const response = await client.query(query);
    client.release();
    return response.rows as TftCompositionAugmentEntity[];
  }

  async getWorstAugmentsStats(statsRequest: BaseStatsRequest){
    const { limit = DefaultValue.LIMIT, placement = DefaultValue.LIMIT, tftSet = DefaultValue.TFT_SET, tftTier = DefaultValue.TFT_TIER } = statsRequest;
    const client = await this.pool.getClient();

    const query = `
    SELECT
    augmentName,
    COUNT(*) AS totalGames,
    SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) AS topFour,
    ROUND(CAST(SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS DECIMAL) / NULLIF(COUNT(*), 0), 2) AS winProbability,
    ROUND(CAST(SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) AS DECIMAL) / NULLIF(COUNT(*), 0), 2) AS topFourProbability
FROM
    TftCompositionAugments
WHERE
    tftSet = '${tftSet}' AND summonerTier = '${tftTier}'
GROUP BY
    augmentName
ORDER BY
    winProbability ASC, topFourProbability ASC
LIMIT ${limit}
 
    `;

    const response = await client.query(query);
    client.release();
    return response.rows as TftCompositionAugmentEntity[];
  }



}
