import { NotificationStatus } from '../enums/notification-status.enum';
import { NotificationCode } from '../enums/notification-сode.enum';
import { HttpStatus } from '@nestjs/common';

/**
 * Result Notification is a classes for response with status code, messages and data ['success'=0, 'error'=1]
 */
export class ResultNotificationFactory<T = null> {
  extensions: NotificationExtension[] = [];
  status: NotificationStatus = NotificationStatus.SUCCESS;
  code: NotificationCode = NotificationCode.OK;
  data: T | null = null; // response data

  static success<T>(data) {
    const not = new ResultNotificationFactory<T>();
    not.addData(data);
  }

  static error(
    message: string,
    key: string | null = null,
    code: NotificationCode | null = null,
  ): ResultNotificationFactory {
    const not = new ResultNotificationFactory();
    not.addError(message, key, code);
    return not;
  }

  hasError() {
    return this.code !== 0;
  }

  addError(
    message: string,
    key: string | null = null,
    code: NotificationCode | null = null,
  ) {
    this.code = code ?? NotificationCode.BAD_REQUEST;
    this.status = NotificationStatus.ERROR;
    this.extensions.push(new NotificationExtension(message, key));
  }

  addData(data: T) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getCode() {
    return this.code;
  }

  addErrorFromNotificationException(e: NotificationException) {
    this.code = e.code ?? NotificationCode.BAD_REQUEST;
    this.extensions.push(new NotificationExtension(e.message, e.key));
  }
}

export class NotificationExtension {
  public message: string;
  public field: string | null;
  public code: HttpStatus;

  constructor(message: string, field: string | null) {
    this.field = field;
    this.message = message;
  }
}

export class NotificationException {
  constructor(
    public message: string,
    public key: string,
    public code: NotificationCode,
  ) {}
}
