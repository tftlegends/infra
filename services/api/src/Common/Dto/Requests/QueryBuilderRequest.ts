import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";
import { Transform } from "class-transformer";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";



export class QueryBuilderRequest extends BaseStatsRequest {

  @ApiPropertyOptional({
    description: 'Name of the champion',
    required: false,
    example: 'Aatrox',
  })
  @IsOptional()
  championName?: string;

  @ApiPropertyOptional({
    description: 'Tier of the champion',
    required: false,
    example: 3,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(3)
  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  championTier?: number;


}
