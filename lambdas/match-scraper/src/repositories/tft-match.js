const { Pool } = require('pg');
class TftMatchRepository {
  constructor({
    port = 5432,
    host = 'localhost',
    user = 'postgres',
    password = 'postgres',
    database = 'tftlegends',
              }) {
    this.postgres = new Pool({
      port,
      host,
      user,
      password,
      database,
    });
    }
  async startTransaction() {
    const client = await this.postgres.connect();
    await client.query('BEGIN');
    return client;
    }

  async commitTransaction(client) {
    await client.query('COMMIT');
    client.release();
  }

  async rollbackTransaction(client) {
    await client.query('ROLLBACK');
    client.release();
  }
  async insertMatch(match,transaction) {
    const client = transaction || await this.postgres.connect();

    /*
    CREATE TABLE IF NOT EXISTS TftMatches (
    matchId VARCHAR(20) PRIMARY KEY NOT NULL,
    participants VARCHAR(78)[] NOT NULL,
    tftSet TEXT NOT NULL,
    gameLength INT NOT NULL,
    gameType TEXT NOT NULL,
    metadata JSONB NOT NULL
);

     */
    const insertMatchQuery = 'INSERT INTO TftMatches (matchId, participants, tftSet, gameLength, gameType, metadata) VALUES ($1, $2, $3, $4, $5, $6)';
    const insertMatchValues = [match.matchId, match.participants, match.tftSet, parseInt(match.gameLength.toString()), match.gameType, match.metadata];
    await client.query(insertMatchQuery, insertMatchValues);

  }

  async insertComposition(compositionEntity, transaction) {
    const client = transaction || await this.postgres.connect();
    const compositionString = JSON.stringify(compositionEntity.composition);
    const query = `INSERT INTO TftCompositions (puuid, matchId, composition, compVector, playerLevel, placement, totalDamageToPlayers, tftSet) VALUES ('${compositionEntity.puuid}', '${compositionEntity.matchId}', '${compositionString}', '[${compositionEntity.compVector}]', '${compositionEntity.playerLevel}', '${compositionEntity.placement}', '${compositionEntity.totalDamageToPlayers}', '${compositionEntity.tftSet}')`;
    await client.query(query);
    if(!transaction) client.release();
  }

  async checkUserExists(puuid) {
    const query = `SELECT * FROM TftUsers WHERE puuid = '${puuid}'`;
    const { rows } = await this.postgres.query(query);
    return rows.length > 0;
  }

  async checkMatchExists(matchId) {
    const query = `SELECT * FROM TftMatches WHERE matchId = '${matchId}'`;
    const { rows } = await this.postgres.query(query);
    return rows.length > 0;
  }

  async createUser(puuid, summonerName) {
    const query = `INSERT INTO TftUsers (puuid, summonerName) VALUES ('${puuid}', '${summonerName}')`;
    await this.postgres.query(query);
  }

  async getRandomUser(){
    const query = `SELECT * FROM TftUsers ORDER BY RANDOM() LIMIT 1`;
    const { rows } = await this.postgres.query(query);
    return rows[0];
  }
}

module.exports = TftMatchRepository;
