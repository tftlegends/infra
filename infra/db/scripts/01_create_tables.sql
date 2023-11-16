CREATE TABLE IF NOT EXISTS TftSummoners
(
    summonerPuuid VARCHAR(78) PRIMARY KEY NOT NULL,
    summonerName  VARCHAR(16)             NOT NULL,
    summonerId    VARCHAR(58)             NOT NULL
);

CREATE TABLE IF NOT EXISTS TftMatches
(
    matchId      VARCHAR(20) PRIMARY KEY NOT NULL,
    participants VARCHAR(78)[]           NOT NULL,
    tftSet       TEXT                    NOT NULL,
    gameLength   INT                     NOT NULL,
    gameType     TEXT                    NOT NULL,
    metadata     JSONB                   NOT NULL
);

CREATE TABLE IF NOT EXISTS TftCompositions
(
    summonerPuuid        VARCHAR(78) NOT NULL,
    matchId              VARCHAR(20) NOT NULL,
    composition          JSONB       NOT NULL,
    -- 32 is the number of different traits available.
    compVector           VECTOR(32)  NOT NULL,
    PRIMARY KEY (summonerPuuid, matchId),
    FOREIGN KEY (summonerPuuid) REFERENCES TftSummoners (summonerPuuid) ON DELETE CASCADE,
    FOREIGN KEY (matchId) REFERENCES TftMatches (matchId) ON DELETE CASCADE,
    playerLevel          INT         NOT NULL,
    placement            INT         NOT NULL,
    totalDamageToPlayers INT         NOT NULL,
    tftSet               TEXT        NOT NULL,
    summonerTier         TEXT        NOT NULL
);

CREATE TABLE IF NOT EXISTS TftCompositionChampions
(
    summonerPuuid VARCHAR(78) NOT NULL,
    matchId       VARCHAR(20) NOT NULL,
    championName  TEXT        NOT NULL,
    summonerTier  TEXT        NOT NULL,
    championItems TEXT[]      NOT NULL,
    placement     INT         NOT NULL,
    tftSet        TEXT        NOT NULL,
    FOREIGN KEY (summonerPuuid) REFERENCES TftSummoners (summonerPuuid) ON DELETE CASCADE,
    FOREIGN KEY (matchId) REFERENCES TftMatches (matchId) ON DELETE CASCADE,
    FOREIGN KEY (summonerPuuid, matchId) REFERENCES TftCompositions (summonerPuuid, matchId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TftCompositionTraits
(
    summonerPuuid VARCHAR(78) NOT NULL,
    matchId       VARCHAR(20) NOT NULL,
    traitName     TEXT        NOT NULL,
    traitTier     INT         NOT NULL,
    summonerTier  TEXT        NOT NULL,
    placement     INT         NOT NULL,
    tftSet        TEXT        NOT NULL,
    FOREIGN KEY (summonerPuuid) REFERENCES TftSummoners (summonerPuuid) ON DELETE CASCADE,
    FOREIGN KEY (matchId) REFERENCES TftMatches (matchId) ON DELETE CASCADE,
    FOREIGN KEY (summonerPuuid, matchId) REFERENCES TftCompositions (summonerPuuid, matchId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TftCompositionAugments
(
    summonerPuuid VARCHAR(78) NOT NULL,
    matchId       VARCHAR(20) NOT NULL,
    augmentName   TEXT        NOT NULL,
    summonerTier  TEXT        NOT NULL,
    placement     INT         NOT NULL,
    tftSet        TEXT        NOT NULL,
    FOREIGN KEY (summonerPuuid) REFERENCES TftSummoners (summonerPuuid) ON DELETE CASCADE,
    FOREIGN KEY (matchId) REFERENCES TftMatches (matchId) ON DELETE CASCADE,
    FOREIGN KEY (summonerPuuid, matchId) REFERENCES TftCompositions (summonerPuuid, matchId) ON DELETE CASCADE
);
