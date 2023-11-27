CREATE TABLE IF NOT EXISTS TftSummoners
(
    summonerPuuid VARCHAR(78) PRIMARY KEY NOT NULL,
    summonerName  TEXT                    NOT NULL,
    summonerId    VARCHAR(63)             NOT NULL
);

CREATE TABLE IF NOT EXISTS TftMatches
(
    matchId      VARCHAR(20) PRIMARY KEY NOT NULL,
    participants VARCHAR(78)[]           NOT NULL,
    tftSet       TEXT                    NOT NULL,
    gameLength   INT                     NOT NULL,
    gameType     TEXT                    NOT NULL,
    metadata     JSONB                   NOT NULL,
    createdAt     TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS TftCompositions
(
    summonerPuuid        VARCHAR(78) NOT NULL,
    matchId              VARCHAR(20) NOT NULL,
    composition          JSONB       NOT NULL,
    traitsVector           VECTOR(64)  NOT NULL,
    championsVector       VECTOR(128)  NOT NULL,
    createdAt       TIMESTAMP   NOT NULL DEFAULT NOW(),
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
    placement     INT         NOT NULL,
    championTier  INT         NOT NULL,
    tftSet        TEXT        NOT NULL,
    createdAt     TIMESTAMP   NOT NULL DEFAULT NOW(),
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
    createdAt     TIMESTAMP   NOT NULL DEFAULT NOW(),
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
    createdAt     TIMESTAMP   NOT NULL DEFAULT NOW(),
    FOREIGN KEY (summonerPuuid) REFERENCES TftSummoners (summonerPuuid) ON DELETE CASCADE,
    FOREIGN KEY (matchId) REFERENCES TftMatches (matchId) ON DELETE CASCADE,
    FOREIGN KEY (summonerPuuid, matchId) REFERENCES TftCompositions (summonerPuuid, matchId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TftCompositionItems
(
    summonerPuuid VARCHAR(78) NOT NULL,
    matchId       VARCHAR(20) NOT NULL,
    itemName      TEXT        NOT NULL,
    summonerTier  TEXT        NOT NULL,
    placement     INT         NOT NULL,
    tftSet        TEXT        NOT NULL,
    championName  TEXT        NOT NULL,
    createdAt     TIMESTAMP   NOT NULL DEFAULT NOW(),
    FOREIGN KEY (summonerPuuid) REFERENCES TftSummoners (summonerPuuid) ON DELETE CASCADE,
    FOREIGN KEY (matchId) REFERENCES TftMatches (matchId) ON DELETE CASCADE,
    FOREIGN KEY (summonerPuuid, matchId) REFERENCES TftCompositions (summonerPuuid, matchId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SummaryTftCompositions (
    compositionId         SERIAL PRIMARY KEY,
    traitsVector           VECTOR(64)  NOT NULL,
    championsVector       VECTOR(128)  NOT NULL,
    summonerTier         TEXT        NOT NULL,
    totalMatches INT  NOT NULL,
    top4Count    INT  NOT NULL,
    firstPlace     INT  NOT NULL,
    secondPlace     INT  NOT NULL,
    thirdPlace     INT  NOT NULL,
    fourthPlace     INT  NOT NULL,
    fifthPlace     INT  NOT NULL,
    sixthPlace     INT  NOT NULL,
    seventhPlace     INT  NOT NULL,
    eighthPlace     INT  NOT NULL,
    winRate      FLOAT  NOT NULL,
    top4Rate     FLOAT  NOT NULL,
    updatedAt     TIMESTAMP   NOT NULL DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS SummaryTftCompositionItems (
    FOREIGN KEY (compositionId) REFERENCES SummaryTftCompositions (compositionId) ON DELETE CASCADE,
    itemName     TEXT NOT NULL,
    championName TEXT NOT NULL,
    championTier INT  NOT NULL,
    totalMatches INT  NOT NULL,
    top4Count    INT  NOT NULL,
    firstPlace     INT  NOT NULL,
    secondPlace     INT  NOT NULL,
    thirdPlace     INT  NOT NULL,
    fourthPlace     INT  NOT NULL,
    fifthPlace     INT  NOT NULL,
    sixthPlace     INT  NOT NULL,
    seventhPlace     INT  NOT NULL,
    eighthPlace     INT  NOT NULL,
    winRate      FLOAT  NOT NULL,
    top4Rate     FLOAT  NOT NULL,
    updatedAt     TIMESTAMP   NOT NULL DEFAULT NOW()
    PRIMARY KEY (compositionId, itemName, championName,championTier)
)

CREATE TABLE IF NOT EXISTS SummaryTftCompositionChampionItems
(
    championName TEXT NOT NULL,
    championTier INT  NOT NULL,
    itemName     TEXT NOT NULL,
    summonerTier TEXT NOT NULL,
    totalMatches INT  NOT NULL,
    top4Count    INT  NOT NULL,
    firstPlace     INT  NOT NULL,
    secondPlace     INT  NOT NULL,
    thirdPlace     INT  NOT NULL,
    fourthPlace     INT  NOT NULL,
    fifthPlace     INT  NOT NULL,
    sixthPlace     INT  NOT NULL,
    seventhPlace     INT  NOT NULL,
    eighthPlace     INT  NOT NULL,
    winRate      FLOAT  NOT NULL,
    top4Rate     FLOAT  NOT NULL,
    PRIMARY KEY (championName, championTier, itemName, summonerTier)
    updatedAt     TIMESTAMP   NOT NULL DEFAULT NOW()
)
