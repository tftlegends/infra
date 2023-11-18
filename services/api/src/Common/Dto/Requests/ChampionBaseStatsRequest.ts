import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChampionBaseStatsRequest extends BaseStatsRequest {

  @ApiProperty({
    type: String,
    required: false,
    name: 'championName',
  })
  @IsString()
  championName? : string;
}
