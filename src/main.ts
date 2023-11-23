import { ConfigService } from '@nestjs/config';
import { environmentConstant } from './common/constants/environment.constant';
import { Logger } from '@nestjs/common';
import { swaggerEndpoint } from './common/constants/endpoints/swagger.endpoint';
import { appConfig } from './common/configurations/app.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './common/configurations/swagger.config';
import { Transport } from '@nestjs/microservices';
import { AUTH_MICROSERVICE } from './common/constants/microservise-name.constant';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: AUTH_MICROSERVICE,
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3000,
    },
  });

  // appConfig(app);
  // swaggerConfig(app);

  await app.listen();
}
bootstrap();
