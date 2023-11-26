import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional, Max, Min } from "class-validator";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { DomainNameTransformer } from "@TftLegends/Common/Logics/DomainNameTransformer";
import { Transform } from "class-transformer";


export class AugmentQuery {
  @ApiProperty({
    example: 'Noxus Emblem',
    required: true,
  })
  @Transform(({ value }) => DomainNameTransformer.convertAugmentName(value))
  augmentName: string;
}

export class ItemQuery {

  @ApiProperty({
    example: 'Bramble Vest',
    required: true,
  })
  @Transform(({ value }) => DomainNameTransformer.convertItemName(value))
  itemName: string;
  @ApiPropertyOptional({
    example: 'Darius',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => DomainNameTransformer.convertChampionName(value))
  championName?: string;

}

export class TraitQuery {
  @ApiProperty({
    example: 'Noxus',
    required: true,
  })
  @Transform(({ value }) => DomainNameTransformer.convertTraitName(value))
  traitName: string;
}

export class ChampionQuery {
  @ApiProperty({
    example: 'Darius',
    required: true,
  })
  @Transform(({ value }) => DomainNameTransformer.convertChampionName(value))
  championName: string;
  @ApiPropertyOptional({
    example: 3,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  @Min(1)
  @Max(3)
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
  @IsObject({
    each: true
  })
  @Transform(({ value }) => {
    return value.map((championQuery: ChampionQuery) => {
      championQuery.championName = DomainNameTransformer.convertChampionName(championQuery.championName);
      return championQuery;
    })
  })
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
  @IsObject({
    each: true
  })
  @Transform(({ value }) => {
    return value.map((traitQuery: TraitQuery) => {
      traitQuery.traitName = DomainNameTransformer.convertTraitName(traitQuery.traitName);
      return traitQuery;
    })
  })
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
  @IsObject({
    each: true
  })
  @Transform(({ value }) => {
    return value.map((itemQuery: ItemQuery) => {
      itemQuery.itemName = DomainNameTransformer.convertItemName(itemQuery.itemName);
      itemQuery.championName = DomainNameTransformer.convertChampionName(itemQuery.championName);
      return itemQuery;
    })
  })
  @IsOptional()
  items?: ItemQuery[] = [];

  @ApiPropertyOptional({
    example: [
      {
        augmentName: 'Noxus Emblem'
      },
    ],
    type: [AugmentQuery] })
  @IsObject({
    each: true
  })
  @Transform(({ value }) => {
    return value.map((augmentQuery: AugmentQuery) => {
      augmentQuery.augmentName = DomainNameTransformer.convertAugmentName(augmentQuery.augmentName);
      return augmentQuery;
    })
  })
  @IsOptional()
  augments?: AugmentQuery[] = [];

}
