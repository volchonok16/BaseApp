import { EnvironmentsEnum } from '../shared/enums/environments.enum';

export const environmentConstant = {
  environment: 'NODE_ENV',
  serverPort: 'SERVER_PORT',
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
};
