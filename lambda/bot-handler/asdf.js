const pg = require('pg');
const {Client} = require("pg");
const {config} = require('dotenv');
config();
const main = async () => {

	const query = `

    SELECT *
FROM (
    SELECT
        puuid,
        matchId,
        placement,
        composition,
        compVector <-> '[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]' AS distance
    FROM
        TftCompositions
    WHERE
        placement < 3
) AS subquery

LIMIT 20;

`;
	const client = new Client({
		port: process.env.POSTGRES_PORT,
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
	});
	await client.connect();
	const nearestMatches = await client.query(query).then(res => res).catch(err => console.log(err));
	console.log(nearestMatches.rows);
}

main();
