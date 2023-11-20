import { Injectable } from "@nestjs/common";
import Repository from "@TftLegends/Common/Repositories/Repository";
import TftCompositionChampionEntity from "@TftLegends/Common/Entities/TftCompositionChampion";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";

@Injectable()
export class CompositionsRepository extends Repository {

  constructor() {
    super();
  }

  async getRandomWinningCompositions(
    request: BaseStatsRequest
  ) {
    const {
      limit = DefaultValue.LIMIT,
      tftSet = DefaultValue.TFT_SET,
      tftTier = DefaultValue.TFT_TIER,
    } = request;
    const client = await this.pool.getClient();
    const query = `
    SELECT * FROM TftCompositions
    WHERE placement = 1 AND tftSet = '${tftSet}' AND summonerTier = '${tftTier}'
    ORDER BY RANDOM()
    LIMIT ${limit};
    `
    const response = await client.query(query);
    client.release();
    return response.rows as TftCompositionChampionEntity[];
  }

}
