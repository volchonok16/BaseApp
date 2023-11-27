import { EnvironmentsEnum } from '../shared/enums/environments.enum';

export const environmentConstant = {
  environment: 'NODE_ENV',
  server: {
    port: 'SERVER_PORT',
    host: 'SERVER_HOST',
  },
  client: {
    port: 'CLIENT_PORT',
    url: 'CLIENT_URL',
  },
  db: {
    port: 'DB_PORT',
    [EnvironmentsEnum.Production]: {
      host: 'DB_HOST',
      user: 'DB_USER',
      password: 'DB_PASSWORD',
      name: 'DB_NAME',
      ssl: true,
    },
    [EnvironmentsEnum.Developer]: {
      host: 'TEST_DB_HOST',
      user: 'TEST_DB_USER',
      password: 'TEST_DB_PASSWORD',
      name: 'TEST_DB_NAME',
      ssl: false,
    },
  },
  secret: {
    accessToken: 'AT_SECRET',
    refreshToken: 'RT_SECRET',
  },
  ttl: {
    accessToken: 'AT_TTL',
    refreshToken: 'RT_TTL',
  },
  oauth: {
    yandex: {
      clientId: 'YANDEX_CLIENT_ID',
      secret: 'YANDEX_CLIENT_SECRET',
    },
    google: {
      clientId: 'GOOGLE_CLIENT_ID',
      secret: 'GOOGLE_SECRET',
    },
  },
  mail: {
    host: 'MAILBOX_HOST',
    port: 'MAILBOX_PORT',
    mailbox: 'MAILBOX',
    password: 'EMAIL_PASSWORD',
  },
};
