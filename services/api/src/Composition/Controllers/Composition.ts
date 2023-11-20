import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Query } from "@nestjs/common";
import { CompositionService } from "@TftLegends/Composition/Services/Composition";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { RootStatsRequest } from "@TftLegends/Common/Dto/Requests/RootStatsRequest";


@ApiTags('Composition')
@Controller('composition')
export class CompositionController {

  constructor( private readonly compositionService: CompositionService) {}

  @Get('random-winning')
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'tftSet', required: false, type: String })
  @ApiQuery({ name: 'tftTier', required: false, type: String })
  public async getRandomWinningCompositions(
    @Query() request: RootStatsRequest
  ) {
    return this.compositionService.getRandomWinningCompositions(request);
  }

}
