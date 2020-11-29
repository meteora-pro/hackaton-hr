import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import difference from 'lodash-es/difference';
import intersection from 'lodash-es/intersection';
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
      SELECT c.title, v."keySkills" vs, c."skillSet" cs, c.experiences, c."educationLevel" edu, c.educations, c.languages, c.salary, v.id vid, c.id cid, SIMILARITY(v.name, c.title) distance
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
  languages: Language[],
  salary?: number;
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
  const matchingSkills = intersection(scoringResults.cs, scoringResults.vs);
  const notMatchingSkills = difference(scoringResults.vs, matchingSkills);
  const additionalSkills = difference(scoringResults.cs, matchingSkills);
  const positiveTags = [];
  const negativeTags = [];

  if (notMatchingSkills.length) {
    positiveTags.push('Присутвуют все ключевые навыки');
  } else {
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
    positiveTags.push(`Хороший уровень знания Английского языка: ${foundLanguage.level}`);
  }

  // Анализ опыта работы
  scoringResults.experiences.forEach( (experience, index) => {
    const maxLen = Math.max(scoringResults.title.length, experience.position.length);
    const distance = (maxLen - levenshtein(scoringResults.title, experience.position)) / maxLen;
    const isLastWork = !experience.end;
    experience.duration = calculateDurationInYears(!experience?.end ? Date.now() : new Date(experience?.end), new Date(experience.start));
    experience.betweenDuration = (index + 1) < (scoringResults.experiences.length - 2) ? calculateDurationInYears(
      new Date(experience.start),
      new Date(scoringResults.experiences[index + 1]?.end),
    ) : 0;
    experience.isRelevant = distance > 0.4;
    experience.distance = distance;
    experience.isLastWork = isLastWork;
  });

  return {
    candidate: {
      title: scoringResults.title,
      experiences: scoringResults.experiences,
    } as unknown as CandidateEntity,
    scoring: {
      percent: scoring,
      positiveTags,
      negativeTags,
      matchingSkills,
      additionalSkills,
    },
  };
}

