import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags, PartialType } from "@nestjs/swagger";
import TftCompositionAugmentEntity from "@TftLegends/Common/Entities/TftCompositionAugment";
import { AugmentsService } from "@TftLegends/Meta/Services/Augments";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";

@ApiTags('Meta/Augments')
@Controller('/meta/augments')
export class AugmentsController {

  constructor(
    private readonly augmentsRepository: AugmentsService,
  ) {}

  @Get('/top')
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'placement', type: Number, required: false })
  @ApiQuery({ name: 'tftSet', type: String, required: false })
  @ApiQuery({ name: 'tftTier', type: String, required: false })
  @ApiOkResponse({ type: [PartialType(TftCompositionAugmentEntity)] })
  async getTopAugments(@Query() stats: BaseStatsRequest) {
    // TODO: Remove this after testing
    console.info('stats', stats);
    return this.augmentsRepository.listTopAugments(stats);
  }

  @Get('/worst')
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'placement', type: Number, required: false })
  @ApiQuery({ name: 'tftSet', type: String, required: false })
  @ApiQuery({ name: 'tftTier', type: String, required: false })
  @ApiOkResponse({ type: [PartialType(TftCompositionAugmentEntity)] })
  async getWorstAugments(@Query() stats: BaseStatsRequest) {
    // TODO: Remove this after testing
    console.info('stats', stats);
    return this.augmentsRepository.listWorstAugments(stats);
  }


}
