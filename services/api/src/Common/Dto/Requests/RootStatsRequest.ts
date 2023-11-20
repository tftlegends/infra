import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { TftSet } from "@TftLegends/Common/Enums/TftSet";
import { TftTier } from "@TftLegends/Common/Enums/TftTier";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";


export class RootStatsRequest {
  @ApiPropertyOptional({
    description: 'The number of items to return',
    default: 10,
    required: false,
    example: 10,
    maximum: 100,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  limit? : number = DefaultValue.LIMIT;

  @ApiPropertyOptional({
    description: 'The set to query',
    default: TftSet.SET9_2,
    required: false,
    enum: TftSet,
    example: TftSet.SET9_2,
  })
  @IsString()
  @IsEnum(TftSet)
  @IsOptional()
  tftSet? : TftSet = DefaultValue.TFT_SET as unknown as TftSet;

  @ApiPropertyOptional({
    description: 'One of the tiers to query',
    default: TftTier.DIAMOND,
    required: false,
    enum: TftTier,
    example: TftTier.DIAMOND
  })
  @IsString()
  @IsEnum(TftTier)
  @IsOptional()
  tftTier? : TftTier = DefaultValue.TFT_TIER as unknown as TftTier;

}

