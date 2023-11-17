import { config as dotenvConfig } from "dotenv";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@TftLegends/App/Module";
import { EnvironmentProvider } from "@TftLegends/Providers/Environment/EnvironmentProvider";
import SwaggerProvider from "@TftLegends/Providers/Swagger/SwaggerProvider";
import { ValidationPipe } from "@nestjs/common";
import VectorDBPool from "@TftLegends/Common/Repositories/Pool";
import { Parameters } from "@TftLegends/Common/Enums/Parameters";
dotenvConfig();
export async function bootstrap() {

  const [
    postgreHost,
    postgrePort,
    postgreUser,
    postgrePassword,
    postgreDatabase,
    riotApiKey,
    matchServiceRegion,
    summonerServiceRegion,
    tftSetVersion,
    username
  ] = await Promise.all([
    EnvironmentProvider.get(Parameters.POSTGRES_HOST),
    EnvironmentProvider.get(Parameters.POSTGRES_PORT),
    EnvironmentProvider.get(Parameters.POSTGRES_USER),
    EnvironmentProvider.get(Parameters.POSTGRES_PASSWORD),
    EnvironmentProvider.get(Parameters.POSTGRES_DB),
    EnvironmentProvider.get(Parameters.RIOT_API_KEY),
    EnvironmentProvider.get(Parameters.MATCH_SERVICE_REGION),
    EnvironmentProvider.get(Parameters.SUMMONER_SERVICE_REGION),
    EnvironmentProvider.get(Parameters.TFT_SET_VERSION),
    EnvironmentProvider.get(Parameters.TFT_USERNAME),
  ]);

  VectorDBPool.getInstance({
    host: postgreHost! as string,
    port: Number.parseInt(postgrePort! as string),
    user: postgreUser! as string,
    password: postgrePassword! as string,
    database: postgreDatabase! as string,
    // Prevents errors causing from RDS connection. RDS has obligation of using SSL.
    ssl: {
      rejectUnauthorized: false,
    },

  })
  const app = await NestFactory.create(AppModule);

  SwaggerProvider(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );



  const port = (await EnvironmentProvider.get('PORT') as string) || 8000;

  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
