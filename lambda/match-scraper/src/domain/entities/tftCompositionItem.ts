/**
 * @typedef {Object} TftCompositionItemsEntity
 * @property {string} summonerPuuid
 * @property {string} matchId
 * @property {string} itemName
 * @property {string} summonerTier
 * @property {number} placement
 * @property {string} tftSet
 * @property {string} championName
 * @example
 * {
 *   "summonerPuuid": "dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA",
 *   "matchId": "TR_4400000000",
 *   "itemName": "TFT4_Spatula",
 *   "summonerTier": "MASTER",
 *   "placement": 1,
 *   "tftSet": "TFTSet9_2",
 *   "championName": "TFT4_Aatrox"
 * }
 */
export default interface TftCompositionItemEntity {
  summonerpuuid: string;
  matchid: string;
  itemname: string;
  summonertier: string;
  placement: number;
  tftset: string;
  championname: string;
};
