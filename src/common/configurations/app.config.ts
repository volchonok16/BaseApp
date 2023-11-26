import { AppModule } from '../../app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../constants/environment.constant';
import { useContainer } from 'class-validator';
import { CustomLogger } from '../logger/customLogger';
import { exceptionFilterSetup } from './exception-filter.setup';
import cookieParser from 'cookie-parser';

export const appConfig = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const clientUrl = configService.get(environmentConstant.client.url);
  const clientPort = configService.get(environmentConstant.client.port);
  console.log(`${clientUrl}:${clientPort}`);
  const options = {
    origin: [`${clientUrl}:${clientPort}`],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization',
    ],
  };

  baseAppConfig(app);
  app.enableCors(options);
  app.useLogger(app.get(CustomLogger));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};

/**
 * Start config for testing and all APP
 * @param app
 */
export const baseAppConfig = (app: INestApplication) => {
  exceptionFilterSetup(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
    }),
  );
  app.use(cookieParser());
};
