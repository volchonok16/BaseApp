import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from './common/constants/environment.constant';
import { useContainer } from 'class-validator';
import { CustomLogger } from './common/logger/customLogger';

export const appInit = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const clientPort = configService.get<number>(environmentConstant.clientPort);

  const options = {
    origin: [`http://localhost:${clientPort}`],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization',
    ],
  };

  app.enableCors(options);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
    }),
  );

  app.useLogger(app.get(CustomLogger));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
