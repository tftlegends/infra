/**
 * @typedef {Object} Summoner
 * @property {string} id
 * @property {string} accountId
 * @property {string} puuid
 * @property {string} name
 * @property {number} profileIconId
 * @property {number} revisionDate
 * @property {number} summonerLevel
 * @example
 * {
 *  "id": "MygC8VcGMllCwe79NHHY5XEsMYV7eZmdkSJ8ytU_YOrEaY8lhbMmwfIPrQ",
 *  "accountId": "Oi8jQpaIRkaFCIILud9eWFCGPY9OP0QQgROMg_7V-9g32gBrvU2Fo00M",
 *  "puuid": "dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA",
 *  "name": "FındıkçıAdam",
 *  "profileIconId": 5316,
 *  "revisionDate": 1700063533000,
 *  "summonerLevel": 1
 * }
 * @description summonerId is the same as id. It is used for fetching league entries.
 * @description puuid is used for fetching match history.
 */
export default interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
