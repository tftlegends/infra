import { config } from 'dotenv'
config();
import TftSummonerRepository from "./repositories/tftSummoners";
import VectorDBPool from "./common/pool";

VectorDBPool.getInstance({
  host: process.env.POSTGRES_HOST!,
  port: Number.parseInt(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2000,
})

const repo = new TftSummonerRepository();


const main = async () => {
  const summoner = await repo.getSummonerBySummonerName("Kiyoon");
  console.log(summoner);
}

main();
