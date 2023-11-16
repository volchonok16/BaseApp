import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NotificationErrors } from '../shared/classes/notification.errors';
import { NotificationCode } from '../shared/enums/notification-сode.enum';
import { ErrorResult } from '../shared/classes/error.view';
import { mapErrorsToNotification } from '../shared/utils/map-errors-to-notification.utils';

@Catch(NotificationErrors)
export class ErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly clientUrl: string) {}

  catch(exception: NotificationErrors, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const notificationCode = exception.resultNotification.getCode();
    const notificationExtensions = exception.resultNotification.extensions;

    const codeMap = {
      [NotificationCode.OK]: 200,
      [NotificationCode.NOT_FOUND]: 404,
      [NotificationCode.BAD_REQUEST]: 400,
      [NotificationCode.UNAUTHORIZED]: 401,
      [NotificationCode.FORBIDDEN]: 403,
      [NotificationCode.SERVER_ERROR]: 500,
    };
    const statusCode = codeMap[notificationCode] || 500;

    const errorResult = new ErrorResult();
    errorResult.statusCode = statusCode;
    errorResult.messages = mapErrorsToNotification(notificationExtensions);
    errorResult.error = NotificationCode[notificationCode];
    return response.status(statusCode).json(errorResult);
  }
}
