import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { VacancyScoring } from '../../../../../libs/api-interfaces/src/lib/api-interfaces';
import { CandidateEntity } from '../entities/candidate.entity';
import { CandidateService } from '../services/candidate.service';
import { VacancyService } from '../services/vacancy.service';
import { randomScoring } from './vacancy.controller';

@ApiTags('candidate')
@Crud({
  model: {
    type: CandidateEntity,
  },
  query: {
    maxLimit: 30,
  }
})


@Controller('candidate')
export class CandidateController implements CrudController<CandidateEntity> {
  constructor(
    public service: CandidateService,
    private vacancyService: VacancyService,
  ) {
  }

  @Get('/:id/matched')
  async matchCandidates(
    @Param('id') id: number,
  ): Promise<VacancyScoring[]> {
    return this.service.findSimilarVacancies(id);
  }
}
