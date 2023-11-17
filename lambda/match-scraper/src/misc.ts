import { config } from 'dotenv'
config();
import TftSummonersRepository from "./repositories/tftSummoners";
import VectorDBPool from "./common/pool";
import EnvironmentProvider from "@/common/environmentProvider";
import { Parameters } from "@/domain/enums/parameters";
import { Client } from "pg";




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
  const response = await client.query('SELECT * FROM TftSummoners');
  console.log(response.rows);

}

main();
