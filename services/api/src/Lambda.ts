import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from "@TftLegends/App/Module";
import SwaggerProvider from "@TftLegends/Providers/Swagger/SwaggerProvider";
import { EnvironmentProvider } from "@TftLegends/Providers/Environment/EnvironmentProvider";
import { Parameters } from "@TftLegends/Common/Enums/Parameters";
import VectorDBPool from "@TftLegends/Common/Repositories/Pool";
import { configure as serverlessExpress } from '@vendia/serverless-express';


let server: Handler;




async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  await app.init();
  SwaggerProvider(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: object,
  context: Context,
  callback: Callback,
) => {

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

  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
