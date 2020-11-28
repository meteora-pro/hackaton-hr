import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './app.config';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfig) => appConfig.dbConnection,
      inject: [AppConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
