import { Injectable } from "@nestjs/common";
import Repository from "@TftLegends/Common/Repositories/Repository";
import TftCompositionChampionEntity from "@TftLegends/Common/Entities/TftCompositionChampion";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import FilterQueryRequest from "@TftLegends/Common/Dto/Requests/FilterQueryRequest";
import { FilterQueryLogic } from "@TftLegends/Common/Logics/FilterQueryLogic";
import TftCompositionEntity from "@TftLegends/Common/Entities/TftComposition";

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
      placement = DefaultValue.PLACEMENT,
    } = request;
    const client = await this.pool.getClient();
    const query = `
    SELECT * FROM TftCompositions
    WHERE placement = ${placement} AND tftSet = '${tftSet}' AND summonerTier = '${tftTier}'
    ORDER BY RANDOM()
    LIMIT ${limit};
    `
    const response = await client.query(query);
    client.release();
    return response.rows as TftCompositionChampionEntity[];
  }


  public async getCompositions(filterQuery: FilterQueryRequest) {
    const { query, params } = FilterQueryLogic.buildQuery(filterQuery);

    const client = await this.pool.getClient();
    const response = await client.query(query, params);


    client.release();
    if(response.rows.length === 0) return [];
    return response.rows as TftCompositionEntity[];
  }
}
