import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { TftSet } from "@TftLegends/Common/Enums/TftSet";
import { TftTier } from "@TftLegends/Common/Enums/TftTier";


export class BaseStatsRequest {
  @ApiPropertyOptional({
    description: 'The number of items to return',
    default: 10,
    required: false,
    example: 10,
    maximum: 100,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number.parseInt(value))
  limit : number = 10;

  @ApiPropertyOptional({
    description: 'The number of items to skip',
    default: 3,
    required: false,
    example: 3,
    minimum: 1,
    maximum: 8,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(8)
  @Transform(({ value }) => Number.parseInt(value))
  placement : number = 3;

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
  tftSet : TftSet = TftSet.SET9_2;

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
  tftTier : TftTier = TftTier.DIAMOND
}

