import { MigrationInterface, QueryRunner } from 'typeorm';
// import * as rawDataSet from '../../assets/predict-sources/all_vacancies.json';
import * as rawDataSet from '../../assets/predict-sources/vacancies_100_sample.json'
import { VacanciesPredictEntity } from '../entities/vacancies-predict.entity';

export class parseVacanciesPredict1606571349242 implements MigrationInterface {
  name = 'vacanciesPredict1606571349242';

  public normalizeString(value: string): string {
    return value.toLowerCase().trim().replace(/\s\s+/g, ' ');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const vacancies: VacanciesPredictEntity[] = [];
    Object.keys(rawDataSet).forEach((key) => {
      const sourceVacancy = rawDataSet[key];
      const vacancyEntity = new VacanciesPredictEntity();

      vacancyEntity.originalName = sourceVacancy['name'];
      vacancyEntity.normalizedName = this.normalizeString(sourceVacancy['name']);
      vacancyEntity.experience = sourceVacancy['experience']['name'];

      const skills = sourceVacancy['key_skills'] as {name: string}[];
      vacancyEntity.skills = skills.map(skill => skill.name);

      vacancies.push(vacancyEntity);
    });
    const vacancyRepository = queryRunner.connection.getRepository(
      VacanciesPredictEntity
    );
    try {
      await vacancyRepository.insert(vacancies);
    } catch (e) {
      console.error('[Insert error] ', e);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
