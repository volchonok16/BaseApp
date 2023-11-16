import { ResultNotificationFactory } from './result-notification.factory';

export class NotificationErrors<T = null> extends Error {
  constructor(public resultNotification: ResultNotificationFactory<T>) {
    super('NotificationErrors');
  }
}
