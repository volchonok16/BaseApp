import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { mapErrorsToNotification } from '../shared/utils/map-errors-to-notification.utils';
import { ErrorResult } from '../shared/classes/error.view';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const responseBody: any = exception.getResponse();

    const errorResult = new ErrorResult();
    errorResult.statusCode = status;

    this.logger.error(JSON.stringify(responseBody));
    if (status === 401) {
      errorResult.messages = [
        { message: 'Authorization error', field: 'authorization' },
      ];
      errorResult.error = 'Unauthorized';
      return response.status(status).json(errorResult);
    }
    errorResult.messages =
      status === 400 ? mapErrorsToNotification(responseBody.message) : [];
    errorResult.error = status === 400 ? 'Bad Request' : exception.message;
    return response.status(status).json(errorResult);
  }
}
