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
    @Query('take') take = 25,
    @Query('skip') skip = 0,
  ): Promise<VacancyScoring[]> {
    const vacancies = await this.vacancyService.find({take: Math.max(take, 30), skip});
    return vacancies.map(vacancy => ({
      vacancy,
      scoring: randomScoring(),
    })).sort((a, b) => b.scoring.percent - a.scoring.percent);
  }
}
