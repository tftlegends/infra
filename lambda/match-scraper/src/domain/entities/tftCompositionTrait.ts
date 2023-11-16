/**
 * @typedef {Object} TftCompositionTraitEntity
 * @property {string} summonerPuuid
 * @property {string} matchId
 * @property {string} traitName
 * @property {number} traitTier
 * @property {number} placement
 * @property {string} tftSet
 * @example
 * {
 *  "summonerPuuid": "dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA",
 *  "matchId": "TR_4400000000",
 *  "traitName": "TFT4_Blademaster",
 *  "traitTier": 9,
 *  "placement": 1,
 *  "tftSet": "TFTSet9_2",
 *  }
 */

export default interface TftCompositionTraitEntity {
  summonerPuuid: string;
  matchId: string;
  traitName: string;
  traitTier: number;
  placement: number;
  tftSet: string;
  summonerTier: string;
}
