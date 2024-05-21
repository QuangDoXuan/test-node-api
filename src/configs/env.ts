import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  host: process.env.NODE_ENV === "development" ? "localhost": "",
  port: process.env.PORT || 3000,
  jwt: {
    secretKey: process.env.JWT_SCRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES || '1h',
  },
  db: {
      host: process.env.DB_HOST || '',
      port: process.env.DB_PORT || '',
      username: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      synchronize: true,
  },
};
