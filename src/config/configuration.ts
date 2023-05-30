import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  clientPort: process.env.URL_FRONTEND,
  database: {
    postgres: {
      type: process.env.DATABASE_TYPE,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      name: process.env.POSTGRES_DB,
      synchronize: process.env.DATABASE_SYNCHRONIZE,
      maxConnections: process.env.DATABASE_MAX_CONNECTIONS,
      sslEnabled: process.env.DATABASE_SSL_ENABLED,
      rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED,
      ca: process.env.DATABASE_CA,
      key: process.env.DATABASE_KEY,
      cert: process.env.DATABASE_CERT,
    },
    redis: {
      url: process.env.URL_REDIS,
    },
  },
  token: {
    accessToken: {
      publicPath: process.env.ACCESS_TOKEN_PUBLIC_KEY_PATH,
      privatePath: process.env.ACCESS_TOKEN_PRIVATE_KEY_PATH,
    },
    refreshToken: {
      publicPath: process.env.REFRESH_TOKEN_PRIVATE_KEY_PATH,
      privatePath: process.env.REFRESH_TOKEN_PUBLIC_KEY_PATH,
    },
  },
}));
