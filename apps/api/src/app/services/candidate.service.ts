import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacancyEntity } from '../entities/vacancy.entity';
import { CandidateEntity } from '../entities/candidate.entity';

@Injectable()
export class CandidateService extends TypeOrmCrudService<CandidateEntity> {
  constructor(
    @InjectRepository(VacancyEntity) repository: Repository<CandidateEntity>
  ) {
    super(repository);
  }
}
