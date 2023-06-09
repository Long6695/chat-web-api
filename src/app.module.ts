import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/User.module';
import { TokenModule } from './modules/token/token.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
      load: [configuration],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AuthModule,
    UserModule,
    TokenModule,
  ],
})
export class AppModule {}
