import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
// import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './libs/httpExceptionFilter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });
  const configService = app.get(ConfigService);
  app.use(helmet());
  app.enableCors({
    origin: configService.get('env.urlFE'),
  });
  app.use(cookieParser());
  // app.use(csurf({ cookie: { sameSite: true } }));
  app.enableCors({
    origin: configService.get('env.urlFE'),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(configService.get('env.port') || 8000);
}
bootstrap();
