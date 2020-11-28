import { MigrationInterface, QueryRunner } from 'typeorm';
import * as rawDataSet from '../../assets/predict-sources/filtered_uniq_skills.json'
import { SkillsFrequencyEntity } from '../entities/skills-frequency.entity';

export class parseFrequencyPredict1606571349242 implements MigrationInterface {
  name = 'parseFrequencyPredict1606571349243';

  public normalizeString(value: string): string {
    return value.toLowerCase().trim().replace(/\s\s+/g, ' ');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query('DELETE from "skills-frequency";');

    const vacancies: SkillsFrequencyEntity[] = [];
    Object.keys(rawDataSet).forEach((key) => {
      const frequency = rawDataSet[key];
      const vacancyEntity = new SkillsFrequencyEntity();

      vacancyEntity.originalName = key;
      vacancyEntity.normalizedName = this.normalizeString(key);
      vacancyEntity.frequency = +frequency;

      vacancies.push(vacancyEntity);
    });
    const skillsRepository = queryRunner.connection.getRepository(
      SkillsFrequencyEntity
    );
    try {
      await skillsRepository.insert(vacancies);
    } catch (e) {
      console.error('[Insert error] ', e);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
