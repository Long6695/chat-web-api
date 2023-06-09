import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('env', () => ({
  nodeEnv: process.env.NODE_ENV,
  urlFE: process.env.URL_FRONTEND,
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
      secret: process.env.ACCESS_TOKEN_SECRET,
      expirationTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    },
  },
}));

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  URL_FRONTEND: Joi.string().required(),

  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  DATABASE_TYPE: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().required(),
  DATABASE_MAX_CONNECTIONS: Joi.number().required(),
  DATABASE_SSL_ENABLED: Joi.string().required(),
  DATABASE_REJECT_UNAUTHORIZED: Joi.boolean().required(),
  DATABASE_CA: Joi.optional().default(null),
  DATABASE_KEY: Joi.optional().default(null),
  DATABASE_CERT: Joi.optional().default(null),

  URL_REDIS: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
  REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
});
