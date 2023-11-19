/**
 * @typedef {Object} LeagueEntry
 * {
 *   "puuid": "dvCWqP7xDqJB2b6_Q-TlUAVtT8d3SaLKrc96IhXcNvVbpGfycO-ttNcte3T7CW58gxWyv1qH1D3vDA",
 *   "leagueId": "7b86dab2-5b83-3822-af78-7448ccb7e04c",
 *   "queueType": "RANKED_TFT",
 *   "tier": "MASTER",
 *   "rank": "I",
 *   "summonerId": "MygC8VcGMllCwe79NHHY5XEsMYV7eZmdkSJ8ytU_YOrEaY8lhbMmwfIPrQ",
 *   "summonerName": "FındıkçıAdam",
 *   "leaguePoints": 125,
 *   "wins": 189,
 *   "losses": 168,
 *   "veteran": false,
 *   "inactive": false,
 *   "freshBlood": false,
 *   "hotStreak": false
 * }
 */

export interface LeagueEntry {
  puuid: string;
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}
