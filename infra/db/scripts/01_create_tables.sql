
CREATE TABLE IF NOT EXISTS TftUsers (
    puuid VARCHAR(78) PRIMARY KEY NOT NULL,
    summonerName VARCHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS TftMatches (
    matchId VARCHAR(20) PRIMARY KEY NOT NULL,
    participants VARCHAR(78)[] NOT NULL,
    tftSet TEXT NOT NULL,
    gameLength INT NOT NULL,
    gameType TEXT NOT NULL,
    metadata JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS TftCompositions (
    puuid VARCHAR(78) NOT NULL,
    matchId VARCHAR(20) NOT NULL,
    composition JSONB NOT NULL,
    -- 32 is the number of different traits available.
    compVector VECTOR(32) NOT NULL,
    PRIMARY KEY (puuid, matchId),
    FOREIGN KEY (puuid) REFERENCES TftUsers(puuid),
    FOREIGN KEY (matchId) REFERENCES TftMatches(matchId),
    playerLevel INT NOT NULL,
    placement INT NOT NULL,
    totalDamageToPlayers INT NOT NULL,
    tftSet TEXT NOT NULL
);
