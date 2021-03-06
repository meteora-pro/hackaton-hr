import { Controller, Get, Param, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { CandidateScoring, Scoring } from '../../../../../libs/api-interfaces/src/lib/api-interfaces';
import { VacancyEntity } from '../entities/vacancy.entity';
import { CandidateService } from '../services/candidate.service';
import { VacancyService } from '../services/vacancy.service';

export function randomScoring(): Scoring {
  return {
    additionalSkills: ['Node.js', 'ООП'],
    matchingSkills: ['React', 'JavaScript', 'Jest', 'JS', 'GIT'],
    percent: Math.random() * 100,
    negativeTags: [
      'Нет профильного образования',
      'Нет информации о работе в команде',
      'Меняет работу чаще 2 раз в год',
    ],
    positiveTags: [
      'Опыт работы более 5 лет',
      'Опыт работы соответсвует зарплатным ожиданиям',
      'Знание английского B2',
      'Проходит курсы',
    ],
  };
}

@ApiTags('vacancy')
@Crud({
  model: {
    type: VacancyEntity,
  },
  query: {
    maxLimit: 30,
  }
})
@Controller('vacancy')
export class VacancyController implements CrudController<VacancyEntity> {
  constructor(
    public service: VacancyService,
    private candidateService: CandidateService,
  ) {}


  @Get('/:id/matched')
  async matchCandidates(
    @Param('id') id: number,
  ): Promise<CandidateScoring[]> {
    return this.service.findSimilarCandidates(id);
  }
}
