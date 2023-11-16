import { INestApplication } from '@nestjs/common';
import { ErrorFilter } from '../exeptions/error.filter';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../constants/environment.constant';
import { HttpExceptionFilter } from '../exeptions/http-exception.filter';
import { ErrorExceptionFilter } from '../exeptions/error-exeption.filter';

export function exceptionFilterSetup(app: INestApplication) {
  const configService = app.get(ConfigService);
  const clientUrl = configService.get(environmentConstant.client.url);
  app.useGlobalFilters(
    new ErrorFilter(),
    new HttpExceptionFilter(),
    new ErrorExceptionFilter(clientUrl),
  );
}
