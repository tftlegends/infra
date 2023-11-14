const {Pool,Client} = require('pg');

class TftMatchRepository {
	constructor({
								port = 5432, host = 'localhost', user = 'postgres', password = 'postgres', database = 'tftlegends',
							}) {

		this.port = port;
		this.host = host;
		this.user = user;
		this.password = password;
		this.database = database;

	}

	async createClient() {
		const client = new Client({
			port: this.port,
			host: this.host,
			user: this.user,
			password: this.password,
			database: this.database,
		});
		await client.connect();
		return client;
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

	async insertMatch(match, transaction) {
		const client = transaction || this.postgres;
		const insertMatchQuery = 'INSERT INTO TftMatches (matchId, participants, tftSet, gameLength, gameType, metadata) VALUES ($1, $2, $3, $4, $5, $6)';
		const insertMatchValues = [match.matchId, match.participants, match.tftSet, parseInt(match.gameLength.toString()), match.gameType, match.metadata];
		await client.query(insertMatchQuery, insertMatchValues);

	}

	async insertComposition(compositionEntity, transaction) {
		const client = transaction || this.postgres;
		const compositionString = JSON.stringify(compositionEntity.composition);
		const query = `INSERT INTO TftCompositions (puuid, matchId, composition, compVector, playerLevel, placement, totalDamageToPlayers, tftSet) VALUES ('${compositionEntity.puuid}', '${compositionEntity.matchId}', '${compositionString}', '[${compositionEntity.compVector}]', '${compositionEntity.playerLevel}', '${compositionEntity.placement}', '${compositionEntity.totalDamageToPlayers}', '${compositionEntity.tftSet}')`;
		await client.query(query);
	}

	async checkUserExists(puuid) {
		const query = `SELECT * FROM TftUsers WHERE puuid = '${puuid}'`;
		const {rows} = await this.postgres.query(query);
		return rows.length > 0;
	}

	async checkMatchExists(matchId) {
		const query = `SELECT * FROM TftMatches WHERE matchId = '${matchId}'`;
		const {rows} = await this.postgres.query(query);
		return rows.length > 0;
	}

	async createUser(puuid, summonerName) {
		const query = `INSERT INTO TftUsers (puuid, summonerName) VALUES ('${puuid}', '${summonerName}')`;
		await this.postgres.query(query);
	}

	async getRandomUser() {
		const query = `SELECT * FROM TftUsers ORDER BY RANDOM() LIMIT 1`;
		const {rows} = await this.postgres.query(query);
		return rows[0];
	}

	async getUserByUsername(username) {

	}

	async getNearest(vector, k = 20) {

		const client = await this.createClient();
		const query = `
				SELECT *
				FROM (
					SELECT
						puuid,
						matchId,
						placement,
						composition,
						compVector <-> '[${vector}]' AS distance
					FROM
						TftCompositions
					WHERE
						placement < 3
						AND 
						compVector <-> '[${vector}]' < 7
					ORDER BY compVector <-> '[${vector}]' ASC
				) AS subquery
					LIMIT ${k}
				
				`;
		const result = await client.query(query).then(res => res).catch(err => console.log(err));
		const rows = result.rows;
		await client.end();
		return rows;
	}
}

module.exports = TftMatchRepository;
