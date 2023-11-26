import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Transform } from "class-transformer";
import { DomainNameTransformer } from "@TftLegends/Common/Logics/DomainNameTransformer";

export class ChampionBaseStatsRequest extends BaseStatsRequest {

  @ApiProperty({
    type: String,
    required: false,
    name: 'championName',
  })
  @IsString()
  @Transform(({ value }) => DomainNameTransformer.convertChampionName(value))
  championName? : string;
}
