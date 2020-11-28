import { MigrationInterface, QueryRunner } from 'typeorm';
import * as rawDataSet from '../../assets/predict-sources/all_vacancies.json';
// import * as rawDataSet from '../../assets/predict-sources/vacancies_100_sample.json'
import { VacanciesPredictEntity } from '../entities/vacancies-predict.entity';

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

    for (const key of Object.keys(rawDataSet))  {

      try {
        const sourceVacancy = rawDataSet[key];
        const vacancyEntity = new VacanciesPredictEntity();

        vacancyEntity.originalName = sourceVacancy['name'];
        vacancyEntity.normalizedName = this.normalizeString(sourceVacancy['name']);
        vacancyEntity.experience = sourceVacancy['experience']['id'];

        const skills = sourceVacancy['key_skills'] as {name: string}[];
        vacancyEntity.skills = skills.map(skill => skill.name);
        console.log('[MIGRATION] work with key', key);
        await vacancyRepository.insert(vacancyEntity);
      } catch (e) {
        console.error('[ERROR] error while iterate dataset', e);
      }
    }

    try {

      console.log('[MIGRATION] end predict migration');
    } catch (e) {
      console.error('[Insert error] ', e);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
