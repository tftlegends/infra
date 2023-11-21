import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";


export class AugmentQuery {

  augmentName: string;
}

export class ItemQuery {

  itemName: string;
  championName?: string;

}

export class TraitQuery {
  traitName: string;
  traitTier?: number;
}

export class ChampionQuery {
  championName: string;
  championTier?: number;
}

export default class FilterQueryRequest extends BaseStatsRequest {
  @ApiPropertyOptional({
    example: [
      {
        championName: 'Darius',
        championTier: 3
      }
    ],
    type: [ChampionQuery] })
  @IsOptional()
  champions?: ChampionQuery[] = [];

  @ApiPropertyOptional({
    example: [
      {
        traitName: 'Noxus',
        traitTier: 3
      },
      {
        traitName: 'Ionia',
        traitTier: 2
      }
    ],
    type: [TraitQuery] })
  @IsOptional()
  traits?: TraitQuery[] = [];

  @ApiPropertyOptional({
    example: [
      {
        itemName: 'Bramble Vest',
        championName: 'Darius'
      }
    ],
    type: [ItemQuery] })
  @IsOptional()
  items?: ItemQuery[] = [];

  @ApiPropertyOptional({
    example: [
      {
        augmentName: 'Noxus Emblem'
      },
    ],
    type: [AugmentQuery] })
  @IsOptional()
  augments?: AugmentQuery[] = [];

}
