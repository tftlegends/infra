import { Injectable } from "@nestjs/common";
import Repository from "@TftLegends/Common/Repositories/Repository";
import TftCompositionChampionEntity from "@TftLegends/Common/Entities/TftCompositionChampion";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { OrderedBaseStatsRequest } from "@TftLegends/Common/Dto/Requests/OrderedBaseStatsRequest";

@Injectable()
export class ChampionsRepository extends Repository {


  async getChampionsByStats(
    request: OrderedBaseStatsRequest,
  ) {
    const {
      limit = DefaultValue.LIMIT,
      tftSet = DefaultValue.TFT_SET,
      tftTier = DefaultValue.TFT_TIER,
      isDescending = true
    } = request;
    const client = await this.pool.getClient();


    const query = `
    SELECT
        championName,
        COUNT(*) AS totalGames,
        SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS wins,
        SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) AS topFour,
        ROUND(CAST(SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS DECIMAL) / NULLIF(COUNT(*), 0), 2) AS winProbability,
        ROUND(CAST(SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) AS DECIMAL) / NULLIF(COUNT(*), 0), 2) AS topFourProbability
    FROM 
        TftCompositionChampions
    WHERE 
        tftSet = '${tftSet}' AND summonerTier = '${tftTier}'
    GROUP BY 
        championName
    ORDER BY 
        ${isDescending ? 'winProbability DESC, topFourProbability DESC' : 'winProbability ASC, topFourProbability ASC'}
    LIMIT ${limit}
`
    const response = await client.query(query);
    client.release();
    return response.rows as TftCompositionChampionEntity[];
  }

}
