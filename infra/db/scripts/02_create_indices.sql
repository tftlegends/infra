CREATE INDEX idx_tftcompositions_matchid_puuid ON TftCompositions(matchId, summonerPuuid);

CREATE INDEX idx_tftcompositionchampions_matchid_puuid ON TftCompositionChampions(matchId, summonerPuuid);
CREATE INDEX idx_tftcompositionchampions_champion ON TftCompositionChampions(championName, championTier);

CREATE INDEX idx_tftcompositionitems_matchid_puuid ON TftCompositionItems(matchId, summonerPuuid);

CREATE INDEX idx_tftcompositiontraits_matchid_puuid ON TftCompositionTraits(matchId, summonerPuuid);

CREATE INDEX idx_tftcompositionaugments_matchid_puuid ON TftCompositionAugments(matchId, summonerPuuid);

-- Create index for createdAt

CREATE INDEX idx_tftcompositions_createdat ON TftCompositions(createdAt);
CREATE INDEX idx_tftcompositionchampions_createdat ON TftCompositionChampions(createdAt);
CREATE INDEX idx_tftcompositionitems_createdat ON TftCompositionItems(createdAt);
CREATE INDEX idx_tftcompositiontraits_createdat ON TftCompositionTraits(createdAt);
CREATE INDEX idx_tftcompositionaugments_createdat ON TftCompositionAugments(createdAt);
