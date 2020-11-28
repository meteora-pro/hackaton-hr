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
    const result = await this.repository
      .createQueryBuilder()
      .select('MIN("originalName")', 'name')
      .addGroupBy('"normalizedName"')
      .orderBy('SIMILARITY("normalizedName" , :p1)', 'DESC')
      .setParameter('p1', normalizedQuery )
      .limit(10).execute() as { name: string }[];


    return result.map((row) => row.name);
  }


  public async getSkillsMap(title: string, experience: ExperienceEnum): Promise<string[]> {
    // ограничить выборку по опыту работы
    const result = await this.repository
      .createQueryBuilder()
      .select('skills', 'skills')
      .orderBy('SIMILARITY("originalName" , :p1)', 'DESC')
      .where('array_length(skills , 1) > 0')
      .setParameter('p1', title )
      .limit(5).execute() as { skills: string[] }[];

    const skills = [];
    result.forEach(item => {
      skills.push(...item.skills);
    })

    return [...new Set(skills)] as string[];
  }
}
