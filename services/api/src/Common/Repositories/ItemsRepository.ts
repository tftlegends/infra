import { Injectable } from "@nestjs/common";
import { ChampionBaseStatsRequest } from "@TftLegends/Common/Dto/Requests/ChampionBaseStatsRequest";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import Repository from "@TftLegends/Common/Repositories/Repository";

@Injectable()
export class ItemsRepository extends Repository{

  constructor() {
    super();
  }

  async getItemsByChampionName(request: ChampionBaseStatsRequest){
    const { limit = DefaultValue.LIMIT, championName , tftSet = DefaultValue.TFT_SET, tftTier = DefaultValue.TFT_TIER } = request;
    const client = await this.pool.getClient();
    const query = `
    SELECT
    championName,
    itemName,
    COUNT(*) AS totalGames,
    SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) AS topFour,
    ROUND(CAST(SUM(CASE WHEN placement = 1 THEN 1 ELSE 0 END) AS DECIMAL) / NULLIF(COUNT(*), 0), 2) AS winProbability,
    ROUND(CAST(SUM(CASE WHEN placement <= 4 THEN 1 ELSE 0 END) AS DECIMAL) / NULLIF(COUNT(*), 0), 2) AS topFourProbability
FROM
    TftCompositionItems
WHERE
    tftSet = '${tftSet}' AND championName = '${championName}' AND summonerTier = '${tftTier}'
GROUP BY
    championName,itemName
ORDER BY
    winProbability DESC, topFourProbability DESC
LIMIT ${limit};`

    const response = await client.query(query);
    client.release();
    return response.rows;
  }



}
