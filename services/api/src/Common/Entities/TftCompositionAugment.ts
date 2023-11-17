import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

/**
 * @typedef {Object} TftCompositionAugmentEntity
 * @property {string} summonerPuuid
 * @property {string} matchId
 * @property {string} augmentName
 * @property {string} summonerTier
 * @property {number} placement
 * @property {string} tftSet
 * @example
 * {
 *   "summonerPuuid": "dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA",
 *   "matchId": "TR_4400000000",
 *   "augmentName": "TFT4_Augment_CritChance",
 *   "summonerTier": "MASTER",
 *   "placement": 1,
 *   "tftSet": "TFTSet9_2"
 * }
 */
export default class TftCompositionAugmentEntity {
  @ApiProperty({
    name: 'summonerpuuid',
    description: 'Summoner PUUID',
    example: 'dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA',
  }) @IsString() summonerpuuid: string;

  @ApiProperty({
    name: 'matchid', description: 'Match ID', example: 'TR_4400000000',
  }) @IsString() matchid: string;

  @ApiProperty({
    name: 'augmentname', description: 'Augment Name', example: 'TFT4_Augment_CritChance',
  }) @IsString() augmentname: string;
  summonertier: string;

  @ApiProperty({
    name: 'placement', description: 'Placement', example: 1,
  }) @IsNumber() @IsPositive() @Min(1) @Max(8) @Transform(({ value }) => Number.parseInt(value)) placement: number;

  @ApiProperty({
    name: 'tftset', description: 'TFT Set', example: 'TFTSet9_2',
  }) @IsString() tftset: string;

}
