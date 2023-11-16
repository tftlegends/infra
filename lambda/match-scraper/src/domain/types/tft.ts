interface TftUserEntity {
  puuid: string;
  summonerName: string;
}

interface TftMatchEntity {
  matchId: string;
  participants: string[];
  tftSet: string;
  gameLength: number;
  gameType: string;
  metadata: any;
}

interface TftCompositionEntity {
  puuid: string;
  matchId: string;
  composition: any;
  compVector: number[];
  playerLevel: number;
  placement: number;
  totalDamageToPlayers: number;
  tftSet: string;
}
