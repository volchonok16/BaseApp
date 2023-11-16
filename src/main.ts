import { ConfigService } from '@nestjs/config';
import { environmentConstant } from './common/constants/environment.constant';
import { Logger } from '@nestjs/common';
import { swaggerEndpoint } from './common/constants/endpoints/swagger.endpoint';
import { appConfig } from './common/configurations/app.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './common/configurations/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);
  swaggerConfig(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(environmentConstant.serverPort);
  await app.listen(port, () => {
    Logger.log(
      `Swagger documentation on http://localhost:${port}/${swaggerEndpoint}`,
      'main',
    );
  });
}
bootstrap();
