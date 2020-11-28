import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateEntity } from '../entities/candidate.entity';

@Injectable()
export class CandidateService extends TypeOrmCrudService<CandidateEntity> {
  constructor(
    @InjectRepository(CandidateEntity) repository: Repository<CandidateEntity>
  ) {
    super(repository);
  }
}
