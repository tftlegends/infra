import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";


export class OrderedBaseStatsRequest extends BaseStatsRequest {

  @ApiPropertyOptional({
    type: Boolean,
    required: false,
    name: 'isDescending',
  })
  @IsBoolean()
  @IsOptional()
  isDescending? : boolean = true;


}


