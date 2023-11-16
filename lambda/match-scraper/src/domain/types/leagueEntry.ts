/**
 * @typedef {Object} LeagueEntry
 * @property {string} queueType
 * @property {string} summonerName
 * @property {boolean} hotStreak
 * @property {number} wins
 * @property {boolean} veteran
 * @property {number} losses
 * @property {string} rank
 * @property {string} leagueId
 * @property {boolean} inactive
 * @property {boolean} freshBlood
 * @property {string} tier
 * @property {string} summonerId
 * @property {number} leaguePoints
 * @example
 * {
 * "queueType": "RANKED_TFT",
 * "summonerName": "FındıkçıAdam",
 * "hotStreak": false,
 * "wins": 189,
 * "veteran": false,
 * "losses": 168,
 * "rank": "I",
 * "leagueId": "7b86dab2-5b83-3822-af78-7448ccb7e04c",
 * "inactive": false,
 * "freshBlood": false,
 * "tier": "MASTER",
 * "summonerId": "MygC8VcGMllCwe79NHHY5XEsMYV7eZmdkSJ8ytU_YOrEaY8lhbMmwfIPrQ",
 * "leaguePoints": 125
 * }
 */
export interface LeagueEntry {
  queueType: string;
  summonerName: string;
  hotStreak: boolean;
  wins: number;
  veteran: boolean;
  losses: number;
  rank: string;
  leagueId: string;
  inactive: boolean;
  freshBlood: boolean;
  tier: string;
  summonerId: string;
  leaguePoints: number;
}
