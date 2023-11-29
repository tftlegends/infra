import { config } from 'dotenv'
config();
import EnvironmentProvider from "@/common/environmentProvider";
import { Parameters } from "@/domain/enums/parameters";
import { Client } from "pg";
import ChampionsMappingManager from "@/domain/mappings/champions";
import {CHAMPIONS_VECTOR_LENGTH} from "@/domain/constants/database";



const main = async () => {
  const [
    postgreHost,
    postgrePort,
    postgreUser,
    postgrePassword,
    postgreDatabase,
  ] = await Promise.all([
    EnvironmentProvider.get(Parameters.POSTGRES_HOST),
    EnvironmentProvider.get(Parameters.POSTGRES_PORT),
    EnvironmentProvider.get(Parameters.POSTGRES_USER),
    EnvironmentProvider.get(Parameters.POSTGRES_PASSWORD),
    EnvironmentProvider.get(Parameters.POSTGRES_DB),
  ]);


  const client = new Client({
    host: postgreHost as string,
    port: Number.parseInt(postgrePort as string, 10),
    user: postgreUser as string,
    password: postgrePassword as string,
    database: postgreDatabase as string,
    ssl: {
      rejectUnauthorized: false,
    }
  });

  await client.connect();

  let offset = 0;
  const limit = 5;
  const championNameMapping = new ChampionsMappingManager("set10");
  await championNameMapping.initializeMappings();
  const totalRows = await client.query('SELECT COUNT(*) FROM TftCompositions WHERE championsVector IS NULL');
  const count = totalRows.rows[0].count;
  console.info(`Total rows: ${count}`);
  while (offset < count) {
    console.info(`Processing offset ${offset}`);
    const response = await client.query(`SELECT matchId,summonerPuuid FROM TftCompositions WHERE championsVector IS NULL LIMIT ${limit} OFFSET ${offset} `);
    const rows = response.rows;

    await Promise.all(rows.map(async (row) => {
      const summonerPuuid = row.summonerpuuid;
      const matchId = row.matchid;
      const championsResult = await client.query('SELECT * FROM TftCompositionChampions WHERE matchId = $1 AND summonerPuuid = $2', [matchId, summonerPuuid]);
      const champions = championsResult.rows;
      const championsVector = new Array(CHAMPIONS_VECTOR_LENGTH).fill(0) as number[];
      for(const champion of champions){
        const championIndex = championNameMapping.convertNearestStringToIndex(champion.championname);
        const championLevel = champion.championtier;
        championsVector[championIndex] = Math.max(championsVector[championIndex], championLevel);

      }
      await client.query(`UPDATE TftCompositions SET championsVector = '[${championsVector}]' WHERE matchId = $1 AND summonerPuuid = $2`, [matchId, summonerPuuid])
    }));

    offset += limit;
  }

  await client.end();



}

main();
