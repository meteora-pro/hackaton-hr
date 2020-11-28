import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecializationEntity } from '../entities/specialization.entity';

@Injectable()
export class SpecializationService extends TypeOrmCrudService<SpecializationEntity> {
  constructor(
    @InjectRepository(SpecializationEntity) repository: Repository<SpecializationEntity>
  ) {
    super(repository);
  }
}
