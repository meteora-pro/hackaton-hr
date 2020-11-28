import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as rawDataSet from '../../assets/predict-sources/all_vacancies.json';
// import * as rawDataSet from '../../assets/predict-sources/vacancies_100_sample.json'
import { VacanciesPredictEntity } from '../entities/vacancies-predict.entity';
import { MigrationSlicer } from '../services/migration-slicer';

export class parseVacanciesPredict1606571349242 implements MigrationInterface {
  name = 'vacanciesPredict1606571349246';

  public normalizeString(value: string): string {
    try {

      return value.toLowerCase().trim().replace(/\s\s+/g, ' ');
    } catch (e) {
      console.error('[ERROR] normalizeString', e);
      return '';
    }
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('[MIGRATION] start predict migration');
    await queryRunner.query('DELETE from public."vacancies-predict";');

    const vacancyRepository = queryRunner.connection.getRepository(
      VacanciesPredictEntity
    );
    const allPredictVacancies = [];
    for (const key of Object.keys(rawDataSet))  {

      try {
        const sourceVacancy = rawDataSet[key];
        const vacancyEntity = new VacanciesPredictEntity();

        vacancyEntity.originalName = sourceVacancy['name'];
        vacancyEntity.normalizedName = this.normalizeString(sourceVacancy['name']);
        vacancyEntity.experience = sourceVacancy['experience']['id'];

        const skills = sourceVacancy['key_skills'] as {name: string}[];
        vacancyEntity.skills = skills.map(skill => skill.name);
        allPredictVacancies.push(vacancyEntity);
      } catch (e) {
        console.error('[ERROR] error while iterate dataset', e);
      }
    }

    try {
      const chunks = MigrationSlicer.sliceData(allPredictVacancies, 100);
      for ( const [index, chunk] of chunks.entries() ) {
        Logger.log(`Load ${index} of ${chunks.length} predict vacancies chunk`);
        await vacancyRepository.insert(chunk);
      }
      console.log('[MIGRATION] end predict migration');
    } catch (e) {
      console.error('[Insert error] ', e);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
