import { CompositionResponse } from "@/domain/types/composition";

/**
 * @typedef {Object} MatchMetadataResponse
 * @property {string} data_version
 * @property {string} match_id
 * @property {string[]} participants
 * @example
 * {
 *         "data_version": "5",
 *         "match_id": "TR1_1431115536",
 *         "participants": [
 *             "uRsu85tQKIfVZ-3yW06_Y827Rk9oBrW04qAgQMwpWH4a5kVOY4w5sZqHfMid5PS7iUACZIzqxp6t0w",
 *             "6LYs-HWa_Gmrjvf7MHpJFTD1ZV9p45p93TYanRQRzr6O7jnwmeivgen5x8BM12EZabJgWnGBbxgh1w",
 *             "yn4EL-d78M-icD33mZYxufHeOFzZy9JWOJ4yx6HxI8CtQAKfiwgCyVcPD6Un_BlWFzykUYjbWtdP9w",
 *             "m4huAEKu_CgNneZKKfvVrbC4FgWOpEM9Q6azTLIbaCAVcCJ7sxHXalopeXdERhLx9Xhsca6rFvf6yg",
 *             "i9G8YgDTuBZGGN0xIznpvwxAYWlyJOQAPUCDkDWj5P4lXUORYDUuTkplQtKG4lYKmpT1AicWt_KpKw",
 *             "aye_iQBeVCifA8T-ToWHp7rQdpGFyT_hsQLM51YBjxmpNEVfZ4ziTEzpOzoFtQG8CBC8sNHWR6BsBA",
 *             "hIFB_pkaqtuYOLXuWmpyLqEjqIPMx67Pt_wNqYFVcqul3QvfC9rJa9amiGY4O---59TO6zly7NXJgQ",
 *             "OqMGRoroG765sWisLavkOSDiDBiATE98PEOK6_q93FusjmBuKiFqXRLVQCRDE-txNxqaqbCxFV1bBw"
 *         ]
 *     },
 */
export interface MatchMetadataResponse {
  data_version: string;
  match_id: string;
  participants: string[];
}

export interface MatchInfoResponse {
  game_datetime: number;
  game_length: number;
  game_version: string;
  queue_id: number;
  tft_game_type: string;
  tft_set_core_name: string;
  tft_set_number: number;
  participants: CompositionResponse[];

}
export interface MatchResponse {
  info: MatchInfoResponse;
  metadata: MatchMetadataResponse;
}
