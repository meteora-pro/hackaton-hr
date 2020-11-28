import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { VacancyEntity } from '../entities/vacancy.entity';
import { CandidateEntity } from '../entities/candidate.entity';
import { CandidateService } from '../services/candidate.service';
import { SpecializationEntity } from '../entities/specialization.entity';
import { SpecializationService } from '../services/specialization.service';

@ApiTags('specialization')
@Crud({
  model: {
    type: VacancyEntity,
  },
})
@Controller('specialization')
export class SpecializationController implements CrudController<SpecializationEntity> {
  constructor(public service: SpecializationService) {}
}
