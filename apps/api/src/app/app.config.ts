import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as packageJson from '../../package.json';
import * as ormConfig from '../../../../ormconfig.js';
import { allEntities } from './entities/all.entities';
import { allMigrations } from './migrations/all.migrations';

@Injectable()
export class AppConfig {
  static runtimeEnv = process.env.NODE_ENV === 'development' ?  'staging' : process.env.NODE_ENV;
  static release = packageJson.version as string;
  static debug = AppConfig.runtimeEnv === 'development';
  constructor(
    private configService: ConfigService,
  ) {}

  get appUrl(): string {
    return this.configService.get('APP_URL', 'http://localhost:3333');
  }

  get dbConnection(): TypeOrmModuleOptions {
    const connection = (ormConfig as unknown as ConnectionOptions[]).find(({ name }) => name === "default") as PostgresConnectionOptions;

    if (!connection) {
      throw new Error(`Connection not found in ormconfig.js: default`);
    }
    const overrideConfig = {
      host: this.configService.get('POSTGRES_HOST') || connection.host,
      port: this.configService.get('POSTGRES_PORT') || connection.port,
      username: this.configService.get('POSTGRES_USERNAME') || connection.username,
      password: this.configService.get('POSTGRES_PASSWORD')  || connection.password,
      database: this.configService.get('DB_NAME')|| connection.database,
    };
    return {
      ...connection,
      ...overrideConfig,
      // оверайдим entities из ormconfig.js для более быстрого запуска проекта
      entities: allEntities,
      migrations: allMigrations,
      name: 'default'
    };
  }
}
