import { Injectable } from "@nestjs/common";
import { CompositionsRepository } from "@TftLegends/Common/Repositories/CompositionsRepository";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import { TftTier } from "@TftLegends/Common/Enums/TftTier";
import { TftSet } from "@TftLegends/Common/Enums/TftSet";


@Injectable()
export class CompositionService {

  constructor(
    private readonly compositionsRepository: CompositionsRepository,
  ) {}

  public async getRandomWinningCompositions(
    request: BaseStatsRequest
  ) {
    const {
      limit = 1,
      tftSet = DefaultValue.TFT_SET,
      tftTier = DefaultValue.TFT_TIER
    } = request;
    return this.compositionsRepository.getRandomWinningCompositions({
      limit,
      tftSet: tftSet as  TftSet,
      tftTier: tftTier as TftTier
                                                                    });
  }

}
