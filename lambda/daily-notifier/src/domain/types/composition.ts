/**
 * @description
 * @typedef {Object} CompositionCompanionResponse
 * @property {string} content_ID
 * @property {number} item_ID
 * @property {number} skin_ID
 * @property {string} species
 * @example
 * {
 *   "content_ID": "fbeaa176-bf5a-42d8-8cd4-7a1910f448c1",
 *   "item_ID": 20018,
 *   "skin_ID": 18,
 *   "species": "PetDSSwordGuy"
 * }
 */
export interface CompositionCompanionResponse {
  content_ID: string;
  item_ID: number;
  skin_ID: number;
  species: string;
}

/**
 * @typedef {Object} CompositionUnitResponse
 * @property {string} character_id
 * @property {string[]} itemNames
 * @property {string} name
 * @property {number} rarity
 * @property {number} tier
 * @example
 * {
 *   "character_id": "TFT9_Darius",
 *   "itemNames": [
 *      "TFT_Item_Bloodthirster",
 *      "TFT_Item_Deathblade",
 *      "TFT_Item_PowerGauntlet"
 *   ],
 *   "name": "",
 *   "rarity": 2,
 *   "tier": 2
 * }
 */
export interface CompositionUnitResponse {
  character_id: string;
  itemNames: string[];
  name: string;
  rarity: number;
  tier: number;
}

/**
 * @typedef {Object} CompositionTraitResponse
 * @property {string} name
 * @property {number} num_units
 * @property {number} style
 * @property {number} tier_current
 * @property {number} tier_total
 * @example
 * {
 *   "name": "Set9_Armorclad",
 *   "num_units": 2,
 *   "style": 1,
 *   "tier_current": 1,
 *   "tier_total": 3
 * }
 */
export interface CompositionTraitResponse {
  name: string;
  num_units: number;
  style: number;
  tier_current: number;
  tier_total: number;
}

/**
 * @typedef {Object} CompositionResponse
 * @property {CompositionUnitResponse[]} units
 * @property {CompositionTraitResponse[]} traits
 * @property {CompositionCompanionResponse} companion
 * @property {string[]} augments
 * @property {number} gold_left
 * @property {number} last_round
 * @property {number} level
 * @property {number} placement
 * @property {number} players_eliminated
 * @property {string} puuid
 * @property {number} time_eliminated
 * @property {number} total_damage_to_players
 * @example
 *
 */
export interface CompositionResponse {
  units: CompositionUnitResponse[];
  traits: CompositionTraitResponse[];
  companion: CompositionCompanionResponse;
  augments: string[];
  gold_left: number;
  last_round: number;
  level: number;
  placement: number;
  players_eliminated: number;
  puuid: string;
  time_eliminated: number;
  total_damage_to_players: number;
}
