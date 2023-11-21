import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import { RootStatsRequest } from "@TftLegends/Common/Dto/Requests/RootStatsRequest";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";


export class NamedStatsRequest extends BaseStatsRequest {
  @ApiPropertyOptional({
    description: 'Item name',
    default: 3,
    required: false,
    example: 3,
    minimum: 1,
    maximum: 8,
  })
  @IsString()
  @IsOptional()
  name? : string = "";


}

