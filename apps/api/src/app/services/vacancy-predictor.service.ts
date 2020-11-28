import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacanciesPredictEntity } from '../entities/vacancies-predict.entity';

@Injectable()
export class VacancyPredictorService extends TypeOrmCrudService<VacanciesPredictEntity> {
  constructor(
    @InjectRepository(VacanciesPredictEntity) repository: Repository<VacanciesPredictEntity>
  ) {
    super(repository);
  }
}
