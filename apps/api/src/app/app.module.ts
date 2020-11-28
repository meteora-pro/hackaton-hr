import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './app.config';
import { allServices } from './services/all.services';
import { allEntities } from './entities/all.entities';
import { allControllers } from './controllers/all.controllers';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfig) => appConfig.dbConnection,
      inject: [AppConfig],
    }),
    TypeOrmModule.forFeature(allEntities),
  ],
  controllers: [...allControllers, AppController],
  providers: [
    AppService,
    ...allServices,
  ],
})
export class AppModule {}
