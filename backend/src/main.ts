import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { Handler } from 'express';

const server = express();

export const createNestServer = async (
  expressInstance: any,
): Promise<Handler> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  await app.init();
  return expressInstance;
};

createNestServer(server);
export default server;
