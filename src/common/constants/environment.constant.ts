export const environmentConstant = {
  environment: 'NODE_ENV',
  serverPort: 'SERVER_PORT',
  client: {
    port: 'CLIENT_PORT',
    url: 'CLIENT_URL',
  },
  db: {
    host: 'DB_HOST',
    port: 'DB_PORT',
    user: 'DB_USER',
    password: 'DB_PASSWORD',
    name: 'DB_NAME',
  },
  secret: {
    accessToken: 'AT_SECRET',
    refreshToken: 'RT_SECRET',
  },
  ttl: {
    accessToken: 'AT_TTL',
    refreshToken: 'RT_TTL',
  },
  auth: {
    googleClientId: 'GOOGLE_CLIENT_ID',
    googleSecret: 'GOOGLE_SECRET',
  },
};
