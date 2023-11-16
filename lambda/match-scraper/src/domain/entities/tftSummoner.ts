/**
 * @typedef {Object} TftSummonerEntity
 * @property {string} summonerPuuid
 * @property {string} summonerName
 * @property {string} summonerId
 * @example
 * {
 *  "summonerPuuid": "dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA",
 *  "summonerName": "FındıkçıAdam",
 *  "summonerId": "MygC8VcGMllCwe79NHHY5XEsMYV7eZmdkSJ8ytU_YOrEaY8lhbMmwfIPrQ"
 *  }
 */
export default interface TftSummonerEntity {
  summonerpuuid: string;
  summonername: string;
  summonerid: string;
}
