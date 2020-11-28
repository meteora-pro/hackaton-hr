import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { CandidateEntity } from '../entities/candidate.entity';
import { CandidateService } from '../services/candidate.service';

@ApiTags('candidate')
@Crud({
  model: {
    type: CandidateEntity,
  },
})
@Controller('candidate')
export class CandidateController implements CrudController<CandidateEntity> {
  constructor(public service: CandidateService) {}
}
