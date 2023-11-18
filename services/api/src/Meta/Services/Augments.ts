import { Injectable } from "@nestjs/common";
import { AugmentsRepository } from "@TftLegends/Common/Repositories/AugmentsRepository";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";

@Injectable()
export class MetaAugmentsService {

  constructor(
    private readonly augmentsRepository: AugmentsRepository,
  ) {}

  listTopAugments(statsRequest: BaseStatsRequest) {
    return this.augmentsRepository.getBestAugmentsStats(statsRequest);
  }

  listWorstAugments(statsRequest: BaseStatsRequest) {
    return this.augmentsRepository.getWorstAugmentsStats(statsRequest);
  }


}
