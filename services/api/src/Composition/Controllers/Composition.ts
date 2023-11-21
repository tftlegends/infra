import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CompositionService } from "@TftLegends/Composition/Services/Composition";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { RootStatsRequest } from "@TftLegends/Common/Dto/Requests/RootStatsRequest";
import FilterQueryRequest from "@TftLegends/Common/Dto/Requests/FilterQueryRequest";


@ApiTags('Composition')
@Controller('composition')
export class CompositionController {

  constructor( private readonly compositionService: CompositionService) {}

  @Get('random-winning')
  @ApiOperation({ summary: 'Get random winning compositions' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'tftSet', required: false, type: String })
  @ApiQuery({ name: 'tftTier', required: false, type: String })
  public async getRandomWinningCompositions(
    @Query() request: RootStatsRequest
  ) {
    return this.compositionService.getRandomWinningCompositions(request);
  }


  @Post('query')
  @ApiOperation({ summary: 'Get compositions by query' })
  @ApiBody({ type: FilterQueryRequest })
  public async getQueryResult(
    @Body() request: FilterQueryRequest
  ) {
    return this.compositionService.getQueryResult(request);
  }
}
