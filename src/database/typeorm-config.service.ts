import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('env.database.postgres.type', {
        infer: true,
      }),
      url: this.configService.get('env.database.postgres.url', { infer: true }),
      host: this.configService.get('env.database.postgres.host', {
        infer: true,
      }),
      port: this.configService.get('env.database.postgres.port', {
        infer: true,
      }),
      username: this.configService.get('env.database.postgres.username', {
        infer: true,
      }),
      password: this.configService.get('env.database.postgres.password', {
        infer: true,
      }),
      database: this.configService.get('env.database.postgres.name', {
        infer: true,
      }),
      synchronize: this.configService.get('env.database.postgres.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      logging:
        this.configService.get('env.nodeEnv', { infer: true }) !== 'production',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/database/migrations/*.js'],
      // cli: {
      //   entitiesDir: 'src',
      //   migrationsDir: 'src/database/migrations',
      //   subscribersDir: 'subscriber',
      // },
      extra: {
        max: this.configService.get('env.database.postgres.maxConnections', {
          infer: true,
        }),
        // ssl: this.configService.get('env.database.postgres.sslEnabled', {
        //   infer: true,
        // })
        //   ? {
        //       rejectUnauthorized: this.configService.get(
        //         'env.database.postgres.rejectUnauthorized',
        //         { infer: true },
        //       ),
        //       ca:
        //         this.configService.get('env.database.postgres.ca', {
        //           infer: true,
        //         }) ?? undefined,
        //       key:
        //         this.configService.get('env.database.postgres.key', {
        //           infer: true,
        //         }) ?? undefined,
        //       cert:
        //         this.configService.get('env.database.postgres.cert', {
        //           infer: true,
        //         }) ?? undefined,
        //     }
        //   : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
