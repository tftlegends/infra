import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags, PartialType } from "@nestjs/swagger";
import TftCompositionAugmentEntity from "@TftLegends/Common/Entities/TftCompositionAugment";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { MetaChampionsService } from "@TftLegends/Meta/Services/Champions";

@Controller('/meta/champions')
@ApiTags('Meta/Champions')
export class MetaChampionsController {

    constructor(
      private readonly metaChampionsService: MetaChampionsService,
    ) {}

    @Get('/top')
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'placement', type: Number, required: false })
    @ApiQuery({ name: 'tftSet', type: String, required: false })
    @ApiQuery({ name: 'tftTier', type: String, required: false })
    @ApiOkResponse({ type: [PartialType(TftCompositionAugmentEntity)] })
    async getTopAugments(@Query() stats: BaseStatsRequest) {
        return this.metaChampionsService.listTopChampions(stats);
    }

    @Get('/worst')
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'placement', type: Number, required: false })
    @ApiQuery({ name: 'tftSet', type: String, required: false })
    @ApiQuery({ name: 'tftTier', type: String, required: false })
    @ApiOkResponse({ type: [PartialType(TftCompositionAugmentEntity)] })
    async getWorstAugments(@Query() stats: BaseStatsRequest) {
        return this.metaChampionsService.listWorstChampions(stats);
    }

}
