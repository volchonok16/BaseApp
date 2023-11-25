import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { appConfig } from './common/configurations/app.config';
import { swaggerConfig } from './common/configurations/swagger.config';
import { environmentConstant } from './common/constants/environment.constant';
import { swaggerEndpoint } from './common/constants/endpoints/swagger.endpoint';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);
  swaggerConfig(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(environmentConstant.server.port);
  const host = configService.get<string>(environmentConstant.server.host);
  await app.listen(port, () => {
    Logger.log(
      `Swagger documentation on ${host}:${port}/${swaggerEndpoint}`,
      'main',
    );
  });
}
bootstrap();
