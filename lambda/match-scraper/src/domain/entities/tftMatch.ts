/**
 * @typedef {Object} TftMatchEntity
 * @property {string} matchId
 * @property {string[]} participants
 * @property {string} tftSet
 * @property {number} gameLength
 * @property {string} gameType
 * @property {object} metadata
 * @example
 * {
 * "matchId": "TR_4400000000",
 * "participants": [
 * "TR_4400000000",
 * "TR_4400000001",
 * "TR_4400000002",
 * "TR_4400000003",
 * "TR_4400000004",
 * "TR_4400000005",
 * "TR_4400000006",
 * "TR_4400000007",
 *  ],
 *  "tftSet": "TFTSet9_2",
 *  "gameLength": 2000,
 *  "gameType": "standard",
 *  "metadata": {},
 *  }
 */
export default interface TftMatchEntity {
  matchId: string;
  participants: string[];
  tftSet: string;
  gameLength: number;
  gameType: string;
  metadata: object;
}
