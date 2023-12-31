/**
 * @typedef {Object} TftCompositionChampionEntity
 * @property {string} summonerPuuid
 * @property {string} matchId
 * @property {string} championName
 * @property {string} summonerTier
 * @property {string[]} championItems
 * @property {number} placement
 * @property {string} tftSet
 * @example
 * {
 *  "summonerpuuid": "dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA",
 *  "matchId": "TR_4400000000",
 *  "championName": "TFT4_Aatrox",
 *  "summonerTier": "MASTER",
 *  "championItems": [
 *    "TFT4_Spatula",
 *    "TFT4_Spatula",
 *    "TFT4_Spatula"
 *  ],
 *  "placement": 1,
 *  "tftSet": "TFTSet9_2",
 * }
 */
export default interface TftCompositionChampionEntity {
  summonerpuuid: string;
  matchid: string;
  championname: string;
  summonertier: string;
  placement: number;
  championtier: number;
  tftset: string;
}
