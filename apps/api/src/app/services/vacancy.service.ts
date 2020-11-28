import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacancyEntity } from '../entities/vacancy.entity';

@Injectable()
export class VacancyService extends TypeOrmCrudService<VacancyEntity> {
  constructor(
    @InjectRepository(VacancyEntity) repository: Repository<VacancyEntity>
  ) {
    super(repository);
  }
}
