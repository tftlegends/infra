/**
 * @typedef {Object} TftCompositionEntity
 * @property {string} summonerPuuid
 * @property {string} matchId
 * @property {object} composition
 * @property {number[]} compVector
 * @property {number} playerLevel
 * @property {number} placement
 * @property {number} totalDamageToPlayers
 * @property {string} tftSet
 * @property {string} summonerTier
 * @example
 * {
 *  "summonerPuuid": "dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA",
 *  "matchId": "TR_4400000000",
 *  "composition": {},
 *  "compVector": [],
 *  "playerLevel": 8,
 *  "placement": 1,
 *  "totalDamageToPlayers": 0,
 *  "tftSet": "TFTSet9_2",
 *  "summonerTier": "MASTER"
 *  }
 */

export default interface TftCompositionEntity {
  summonerpuuid: string;
  matchid: string;
  composition: object;
  traitsVector: number[];
  championsVector: number[];
  playerlevel: number;
  placement: number;
  totaldamagetoplayers: number;
  tftset: string;
  summonertier: string;
}
