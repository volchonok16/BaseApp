import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerEndpoint } from '../constants/endpoints/swagger.endpoint';

export const swaggerConfig = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .addCookieAuth('refreshToken')
    .setTitle('Authorization service')
    .setDescription('AdjinaTec authorization service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [],
  });
  SwaggerModule.setup(swaggerEndpoint, app, document);
};
