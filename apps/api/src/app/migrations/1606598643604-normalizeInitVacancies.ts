import { Logger } from '@nestjs/common';
import {MigrationInterface, QueryRunner} from "typeorm";
import * as rawVacationsDataSet from '../../assets/predict-sources/all_vacancies.json';
import { VacancyEntity } from '../entities/vacancy.entity';
import { DataTransformer } from '../services/data-transformer';
import { MigrationSlicer } from '../services/migration-slicer';

export class normalizeInitVacancies1606598643604 implements MigrationInterface {
  name = 'normalizeInitVacancies1606598643604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const normalizedVacancy = DataTransformer.normalizeVacations(rawVacationsDataSet);

    const vacancyRepository = queryRunner.connection.getRepository(
      VacancyEntity,
    );
    const chunks = MigrationSlicer.sliceData(normalizedVacancy, 25);
    for ( const [index, chunk] of chunks.entries() ) {
      Logger.log(`Load ${index} of ${chunks.length} vacations chunk`);
      await vacancyRepository.insert(chunk);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
