import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './app.config';
import { allServices } from './services/all.services';
import { allEntities } from './entities/all.entities';
import { allControllers } from './controllers/all.controllers';

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
  controllers: [...allControllers],
  providers: [
    ...allServices,
  ],
})
export class AppModule {}
