import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { VacancyEntity } from '../entities/vacancy.entity';

@Injectable()
export class VacancyService extends TypeOrmCrudService<VacancyEntity> {
  constructor(
    @InjectRepository(VacancyEntity) private repository: Repository<VacancyEntity>
  ) {
    super(repository);
  }

  async findSimilarCandidates(id: number) {
    const result = await this.repository.query(`
      SELECT v.name, c.title, v.id, c.id, SIMILARITY(v.name, c.title) distance
      from vacancies v LEFT JOIN candidates c ON SIMILARITY(v.name, c.title) > 0.4
      WHERE v.id = $1
      ORDER BY distance DESC
      LIMIT 300;
    `, [id]);

    return result;
  }
}
