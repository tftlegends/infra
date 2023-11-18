import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags, PartialType } from "@nestjs/swagger";
import TftCompositionAugmentEntity from "@TftLegends/Common/Entities/TftCompositionAugment";
import { MetaAugmentsService } from "@TftLegends/Meta/Services/Augments";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";

@ApiTags('Meta/Augments')
@Controller('/meta/augments')
export class MetaAugmentsController {

  constructor(
    private readonly metaAugmentsService: MetaAugmentsService,
  ) {}

  @Get('/top')
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'placement', type: Number, required: false })
  @ApiQuery({ name: 'tftSet', type: String, required: false })
  @ApiQuery({ name: 'tftTier', type: String, required: false })
  @ApiOkResponse({ type: [PartialType(TftCompositionAugmentEntity)] })
  async getTopAugments(@Query() stats: BaseStatsRequest) {
    return this.metaAugmentsService.listTopAugments(stats);
  }

  @Get('/worst')
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'placement', type: Number, required: false })
  @ApiQuery({ name: 'tftSet', type: String, required: false })
  @ApiQuery({ name: 'tftTier', type: String, required: false })
  @ApiOkResponse({ type: [PartialType(TftCompositionAugmentEntity)] })
  async getWorstAugments(@Query() stats: BaseStatsRequest) {
    return this.metaAugmentsService.listWorstAugments(stats);
  }


}
