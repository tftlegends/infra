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
export default interface TftCompositionAugmentEntity {
  summonerPuuid: string;
  matchId: string;
  augmentName: string;
  summonerTier: string;
  placement: number;
  tftSet: string;
}
