import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import {
  CandidateScoring,
  EducationLevelEnum,
  Experience,
  Language,
  LanguageEnum,
  LanguageLevelEnum,
} from '../../../../../libs/api-interfaces/src/lib/api-interfaces';
import { CandidateEntity } from '../entities/candidate.entity';
import { VacancyEntity } from '../entities/vacancy.entity';
import { CommonService } from './common/common.service';
import { levenshtein } from './distance';

@Injectable()
export class VacancyService extends TypeOrmCrudService<VacancyEntity> {
  constructor(
    @InjectRepository(VacancyEntity) private repository: Repository<VacancyEntity>
  ) {
    super(repository);
  }

  async findSimilarCandidates(id: number): Promise<CandidateScoring[]> {
    const result = await this.repository.query(`
      SELECT c.title, v."salaryFrom", v."salaryTo", v."keySkills" vs, c."skillSet" cs, c.experiences, c."educationLevel" edu, c.educations, c.languages, c.salary, v.id vid, c.id cid, SIMILARITY(v.name, c.title) distance
      from vacancies v LEFT JOIN candidates c ON SIMILARITY(v.name, c.title) > 0.4
      WHERE v.id = $1
      ORDER BY distance DESC
      LIMIT 50
    `, [id]);

    return result.map(makeScoringLabels).sort((a, b) => b.scoring.percent - a.scoring.percent );
  }
}

export interface ScoringResults {
  title: string;
  vs: string[];
  cs: string[];
  experiences: MarkedExperience[];
  edu: EducationLevelEnum;
  languages: Language[];
  salaryFrom: number;
  salary?: number;
  salaryTo: number;
  vid: number;
  cid: number;
  distance: number;
}

export interface MarkedExperience extends Experience {
  duration: number;
  betweenDuration: number; // Время между работами
  isRelevant: boolean;
  distance: number;
  isLastWork: boolean;
}

const ONE_DAY = 86400000;

export function calculateDurationInYears(endDate: Date | number, startDate: Date | number) {
  return Math.floor((+endDate - +startDate) / ONE_DAY);
}

export function makeScoringLabels(scoringResults: ScoringResults): CandidateScoring {
  const scoring = Math.floor(scoringResults.distance * 100);
  const matchingSkills = CommonService.intersection(scoringResults.cs, scoringResults.vs);
  const notMatchingSkills = CommonService.difference(scoringResults.vs, matchingSkills);
  const additionalSkills = CommonService.difference(scoringResults.cs, matchingSkills);
  const positiveTags = [];
  const negativeTags = [];

  let positiveScoringBalance = 0;
  let negativeScoringBalance = 0;

  if (notMatchingSkills.length === 0 && matchingSkills.length > 0) {
    positiveScoringBalance += 30;
    positiveTags.push('Присутвуют все ключевые навыки');
  } else if (scoringResults.vs.length > 0) {
    negativeScoringBalance += 20;
    negativeTags.push(`Отсутсвуют ключевые навыки: ${notMatchingSkills.join(', ')}`)
  }

  // Анализ языков
  const foundLanguage = scoringResults.languages.find(lang => lang.name === LanguageEnum.ENGLISH);
  if (
    foundLanguage?.level === LanguageLevelEnum.B2
    || foundLanguage?.level === LanguageLevelEnum.C2
    || foundLanguage?.level === LanguageLevelEnum.C1
    || foundLanguage?.level === LanguageLevelEnum.NATIVE
  ) {
    positiveScoringBalance += 3;
    positiveTags.push(`Хороший уровень знания Английского языка: ${foundLanguage.level}`);
  }

  // Анализ опыта работы
  let totalDuration = 0;
  let relevantDuration = 0;
  scoringResults.experiences.forEach( (experience, index) => {
    const maxLen = Math.max(scoringResults.title.length, experience.position.length);
    const distance = (maxLen - levenshtein(scoringResults.title, experience.position)) / maxLen;
    const isLastWork = !experience.end;
    const isRelevant = distance > 0.4;
    const duration = calculateDurationInYears(!experience?.end ? Date.now() : new Date(experience?.end), new Date(experience.start));
    totalDuration += duration;
    if (isRelevant) {
      relevantDuration += duration;
    }
    experience.duration = duration;
    experience.betweenDuration = (index + 1) < (scoringResults.experiences.length - 2) ? calculateDurationInYears(
      new Date(experience.start),
      new Date(scoringResults.experiences[index + 1]?.end),
    ) : 0;
    experience.isRelevant = isRelevant;
    experience.distance = distance;
    experience.isLastWork = isLastWork;
  });
  const relevantPercent = (1 - (totalDuration - relevantDuration)) ;
  if (relevantPercent < 0.3) {
    negativeScoringBalance += 7;
    negativeTags.push('Релевантного опыта работы менее 30%');
  }

  if (relevantPercent > 0.7) {
    positiveScoringBalance += 7;
    positiveTags.push('Релевантного опыта более 70%')
  }

  const tooLongDurationExperiences = scoringResults.experiences.filter( experience => experience.betweenDuration > 200 );
  if (tooLongDurationExperiences.length > 0) {
    negativeScoringBalance += 5;
    negativeTags.push(`Есть перерывы между местами работы более 200 дней: ${tooLongDurationExperiences.map(experience => `${experience.position}(${experience.betweenDuration} д.)`).join(', ')}`)
  }

  if (tooLongDurationExperiences.length === 0) {
    positiveScoringBalance += 1;
    positiveTags.push(`Нет больших перерывов между местами работы`);
  }

  if (scoringResults.salary) {
    if (scoringResults.salaryTo && scoringResults.salaryFrom
      && scoringResults.salary < scoringResults.salaryTo
    ) {
      if (scoringResults.salary > scoringResults.salaryFrom) {
        positiveScoringBalance += 5;
        positiveTags.push('Зарплатная вилка соответсвует ожиданиям кандидата');
      } else {
        positiveScoringBalance += 10;
        positiveTags.push('Мы можем предложить кандидату больше чем он ожидает');
      }
    }
    if (scoringResults.salaryTo && scoringResults.salary > scoringResults.salaryTo) {
      negativeScoringBalance += 20;
      negativeTags.push('Кандидат ожидает большем чем мы ему можем предложить');
    }
  }

  const positiveCorrection = 1 - scoring;
  const negativeCorrection = scoring;

  const percent = Math.min(Math.floor(scoring - (negativeCorrection * negativeScoringBalance)/ 100 + (positiveCorrection * positiveScoringBalance ) /100), 100);

  return {
    candidate: {
      title: scoringResults.title,
      experiences: scoringResults.experiences,
      id: scoringResults.cid,
    } as unknown as CandidateEntity,
    scoring: {
      percent,
      positiveTags,
      negativeTags,
      matchingSkills,
      additionalSkills,
    },
  };
}

