CREATE VIEW TftUserMatches AS
SELECT
    u.puuid,
    u.summonerName,
    m.tftSet,
    m.gameLength,
    m.gameType,
    m.metadata
FROM
    TftUsers u
JOIN
    TftMatches m ON u.puuid = ANY(m.participants);
