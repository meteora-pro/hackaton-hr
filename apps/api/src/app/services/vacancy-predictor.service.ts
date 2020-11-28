import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacanciesPredictEntity } from '../entities/vacancies-predict.entity';

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
}
