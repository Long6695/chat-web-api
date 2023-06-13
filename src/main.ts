import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from 'src/app.module';
// import * as csurf from 'csurf';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from 'src/libs/httpExceptionFilter';

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
