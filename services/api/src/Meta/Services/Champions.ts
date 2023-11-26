import { Injectable } from "@nestjs/common";
import { ChampionsRepository } from "@TftLegends/Common/Repositories/ChampionsRepository";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";

@Injectable()
export class MetaChampionsService {

  constructor(private readonly championsRepository: ChampionsRepository,) {}

  public async listTopChampions(statsRequest: BaseStatsRequest) {
    return this.championsRepository.getChampionsByStats({
      ...statsRequest, isDescending: true,
    });
  }

  public async listWorstChampions(statsRequest: BaseStatsRequest) {
    return this.championsRepository.getChampionsByStats({
      ...statsRequest, isDescending: false,
    });
  }

}
