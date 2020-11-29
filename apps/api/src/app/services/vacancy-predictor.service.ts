import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacanciesPredictEntity } from '../entities/vacancies-predict.entity';
import { ExperienceEnum } from '@meteora/api-interfaces';

@Injectable()
export class VacancyPredictorService {
  constructor(
    @InjectRepository(VacanciesPredictEntity)
    private repository: Repository<VacanciesPredictEntity>
  ) {}

  public async getVacancyTitles(query = ''): Promise<string[]> {
    const normalizedQuery = query.trim().toLowerCase();
    const result = (await this.repository
      .createQueryBuilder()
      .select('MIN("originalName")', 'name')
      .addGroupBy('"normalizedName"')
      .orderBy('SIMILARITY("normalizedName" , :p1)', 'DESC')
      .setParameter('p1', normalizedQuery)
      .limit(10)
      .execute()) as { name: string }[];

    return result.map((row) => row.name);
  }

  public async getSkillsMap(
    title: string,
    experience: ExperienceEnum
  ): Promise<{ name: string, preset: boolean }[]> {
    // ограничить выборку по опыту работы
    const result = (await this.repository
      .createQueryBuilder()
      .select('skills', 'skills')
      .orderBy('SIMILARITY("originalName" , :p1)', 'DESC')
      .where('array_length(skills , 1) > 0')
      .setParameter('p1', title)
      .limit(5)
      .execute()) as { skills: string[] }[];

    const skills = [];
    result.forEach((item) => {
      skills.push(...item.skills);
    });

    const countsExtended = this.groupingAndNormalizeSkills(skills);

    const mean = this.getMean(countsExtended.map((skill) => skill.count));

    return countsExtended.map((skill) => {
      return {
        name: skill.name,
        preset: !!mean && skill.count > mean
      };
    });
  }

  private groupingAndNormalizeSkills(skills: string[]): { name: string; count: number }[] {
    const normalizedSkills = skills.map((key) => ({ name: key }));

    const counts = normalizedSkills.reduce((p, c) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!p.hasOwnProperty(c.name)) {
        p[c.name] = 0;
      }
      p[c.name]++;
      return p;
    }, {});

    return Object.keys(counts)
      .map((k) => ({ name: k, count: counts[k] }))
      .sort((a, b) => b.count - a.count);
  }

  private getMean(arr: number[]): number {
    if (!arr || !arr.length) {
      return 0;
    }
    const len = arr.length;
    const arrSort = arr.sort();
    const mid = Math.ceil(len / 2);

    return len % 2 == 0
      ? (arrSort[mid] + arrSort[mid - 1]) / 2
      : arrSort[mid - 1];
  }
}
