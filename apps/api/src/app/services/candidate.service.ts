import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ExperienceEnum, VacancyScoring } from '../../../../../libs/api-interfaces/src/lib/api-interfaces';
import { CandidateEntity } from '../entities/candidate.entity';
import { VacancyEntity } from '../entities/vacancy.entity';
import { CommonService } from './common/common.service';

@Injectable()
export class CandidateService extends TypeOrmCrudService<CandidateEntity> {
  constructor(
    @InjectRepository(CandidateEntity) private repository: Repository<CandidateEntity>
  ) {
    super(repository);
  }

  async findSimilarVacancies(candidateId: number): Promise<VacancyScoring[]> {
    const results = await this.repository.query(`
    SELECT v.name, v."salaryFrom", v.experience, v."vacancyOwner", v."salaryTo", v."keySkills" vs, c."skillSet" cs, c.salary, v.id vid, c.id cid, SIMILARITY(v.name, c.title) distance
    from candidates c LEFT JOIN vacancies v ON SIMILARITY(v.name, c.title) > 0.3
    WHERE c.id = $1
    ORDER BY distance DESC
    LIMIT 50
    `, [candidateId]);

    return results.map(scoreVacancy).sort((a, b) => b.scoring.percent - a.scoring.percent);
  }
}

export interface ScoringResult {
  name: string;
  vs: string[];
  cs: string[];
  experience: ExperienceEnum;
  vacancyOwner: string;
  salaryFrom: number;
  salary?: number;
  salaryTo: number;
  vid: number;
  cid: number;
  distance: number;
}

export function scoreVacancy(result: ScoringResult): VacancyScoring {
  const scoring = Math.floor(result.distance * 100);
  const matchingSkills = CommonService.intersection(result.cs, result.vs);
  const notMatchingSkills = CommonService.difference(result.vs, matchingSkills);
  const additionalSkills = CommonService.difference(result.cs, matchingSkills);
  const positiveTags = [];
  const negativeTags = [];

  let positiveScoringBalance = 0;
  let negativeScoringBalance = 0;

  if (notMatchingSkills.length === 0 && matchingSkills.length > 0) {
    positiveScoringBalance += 30;
    positiveTags.push('Присутвуют все ключевые навыки');
  } else if (result.vs.length > 0) {
    negativeScoringBalance += 20;
    negativeTags.push(`Отсутсвуют ключевые навыки: ${notMatchingSkills.join(', ')}`)
  }

  if (result.salary) {
    if (result.salaryTo && result.salaryFrom
      && result.salary < result.salaryTo
    ) {
      if (result.salary > result.salaryFrom) {
        positiveScoringBalance += 5;
        positiveTags.push('Зарплатная вилка соответсвует ожиданиям кандидата');
      } else {
        positiveScoringBalance += 10;
        positiveTags.push('Мы можем предложить кандидату больше чем он ожидает');
      }
    }
    if (result.salaryTo && result.salary > result.salaryTo) {
      negativeScoringBalance += 20;
      negativeTags.push('Кандидат ожидает большем чем мы ему можем предложить');
    }
  }

  const positiveCorrection = 1 - scoring;
  const negativeCorrection = scoring;

  const percent = Math.min(Math.floor(scoring - ((negativeCorrection * negativeScoringBalance)/100 + (positiveCorrection * positiveScoringBalance )/100)), 100);

  return {
    scoring: {
      percent,
      positiveTags,
      negativeTags,
      matchingSkills,
      additionalSkills,
    },
    vacancy: {
      vacancyOwner: result.vacancyOwner,
      experience: result.experience,
      name: result.name,
      id: result.vid,
    } as VacancyEntity,
  };
}
