import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { VacancyEntity } from '../entities/vacancy.entity';
import { CandidateEntity } from '../entities/candidate.entity';
import { CandidateService } from '../services/candidate.service';

@ApiTags('candidate')
@Crud({
  model: {
    type: VacancyEntity,
  },
})
@Controller('candidate')
export class CandidateController implements CrudController<CandidateEntity> {
  constructor(public service: CandidateService) {}
}
