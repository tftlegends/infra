import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import { RootStatsRequest } from "@TftLegends/Common/Dto/Requests/RootStatsRequest";


export class BaseStatsRequest extends RootStatsRequest {
  @ApiPropertyOptional({
    description: 'The number of items to skip',
    default: 3,
    required: false,
    example: 3,
    minimum: 1,
    maximum: 8,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(8)
  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  placement? : number = DefaultValue.PLACEMENT;


}

