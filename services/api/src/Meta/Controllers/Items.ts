import { Controller, Get, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { MetaItemsService } from "@TftLegends/Meta/Services/Items";
import { ChampionBaseStatsRequest } from "@TftLegends/Common/Dto/Requests/ChampionBaseStatsRequest";

@Controller('/meta/items') @ApiTags('Meta/Items')
export class MetaItemsController {

  constructor(private readonly metaItemsService: MetaItemsService,) {}


  @Get('by-champion-name')
  @ApiQuery({ name: 'championName', type: String, required: true, example: 'Aatrox' })
  @ApiQuery({ name: 'tftSet', type: String, required: false })
  @ApiQuery({ name: 'tftTier', type: String, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'placement', type: Number, required: false })
  async getItems(@Query() request: ChampionBaseStatsRequest) {
    return this.metaItemsService.getItemsByChampionName(request);
  }


}

