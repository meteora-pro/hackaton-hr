import { Logger } from '@nestjs/common';
import {
  EducationLevelEnum,
  Experience,
  Language,
  LanguageEnum,
  LanguageLevelEnum,
} from '../../../../../libs/api-interfaces/src/lib/api-interfaces';
import { CandidateEntity } from '../entities/candidate.entity';


export class DataTransformer {
  static normalizeResumes(rawResumes): CandidateEntity[] {
    return Object.values(rawResumes).map( (resume: any) => {
      return {
        about: resume.skills,
        area: resume.area,
        birthDate: parseDate(resume.birth_date),
        educationLevel: parseEducationLevel(resume.education_level),
        educations: resume.education,
        experiences: parseExperience(resume.experience),
        fullName: 'Анонимное резюме',
        gender: parseGender(resume.gender),
        languages: parseLanguages(resume.language),
        phone: 'Не указан',
        salary: parseSalary(resume.salary),
        skillSet: resume.skill_set,
        skills: resume.skills,
        specialization: resume.specialization.map( specialisation => ({
          name: specialisation.name,
          profareaName: specialisation.profarea_name,
        })),
        title: resume.title,
      } as CandidateEntity;
    });
  }

  static normalizeVacations(vacations) {}
}

export function parseCurrency(currency: string): number {
  switch (currency) {
    case 'руб.':
    case 'RUB':
      return 1;
    case 'EUR':
      return 90;
    case 'USD':
      return 80;
    case 'бел. руб.':
      return 30;
    case 'KZT':
      return 0.18;
    case 'грн.':
      return 2.7;
    default:
      return 0;
  }
}

export function parseSalary(salary: { amount: number, currency: string | null }): number {
  if (!salary.amount) {
    return null;
  }
  const curse = parseCurrency(salary.currency);
  if (!curse) {
    return null;
  }
  return Math.floor(+salary.amount * curse);
}

export function parseLanguageLevel(val): LanguageLevelEnum {
  switch (val) {
    case 'A1 - Basic':
    case 'A1 - Начальный':
      return LanguageLevelEnum.A1;
    case 'A2 - Элементарный':
    case 'A2 - Elementary':
      return LanguageLevelEnum.A2;
    case 'B1 - Средний':
    case 'B1 - Intermediate':
      return LanguageLevelEnum.B1;
    case 'B2 - Upper Intermediate':
    case 'B2 - Средне-продвинутый':
      return LanguageLevelEnum.B2;
    case 'C1 - Продвинутый':
    case 'C1 - Advanced':
      return LanguageLevelEnum.C1;
    case 'C2 - В совершенстве':
    case 'C2 - Proficiency':
      return LanguageLevelEnum.C2;
    case 'Родной':
    case 'Native':
      return LanguageLevelEnum.NATIVE;
    default:
      return LanguageLevelEnum.UNKNOWN;
  }
}

export function parseLanguage(val): LanguageEnum {
  switch (val) {
    case 'Русский':
    case 'Russian':
      return LanguageEnum.RUSSIAN;
    case 'Английский':
    case 'English':
      return LanguageEnum.ENGLISH;
    default:
        return LanguageEnum.OTHER;
  }
}

export function parseLanguages(rawLanguages): Language[] {
  return rawLanguages.map( raw => ({
    level: parseEducationLevel(raw.level),
    name: parseLanguage(raw.name),
  }));
}

export function parseGender(val: string): CandidateEntity['gender']{
  switch (val) {
    case 'Мужчина':
    case 'Male':
      return 'male';
    case 'Женщина':
    case 'Female':
      return 'female';
    default:
      return 'unknown';
  }
}

export interface RawExperience {
  start: string;
  end: string | null;
  position: string;
  description: string;
}

const parseDateRexExp = /(\d{1,2})\s([\W\w]+)\s(\d{4})/;
const months = [
  'янв',     'фев',     'мар', 'апр', 'ма', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
  'January', 'February','March','April','May','June','July','August','September','October','November','December'
];

export function parseDate(dateInput: string): Date {
  if (!dateInput) {
    return null;
  }
  try {
    const parsedNumber = Date.parse(dateInput);
    if (Number.isNaN(parsedNumber)) {
      const matched = dateInput.match(parseDateRexExp);
      if (matched === null) {
        throw new Error(`Bad date ${parsedNumber}`);
      }
      const [_, date, month, years] = matched;
      let monthNumber = +month;
      if (Number.isNaN(monthNumber)) {
        monthNumber = months.findIndex( val => month.startsWith(val)) % 12;
        if (monthNumber < 0) {
          throw new Error(`Bad month ${monthNumber}`);
        }
        monthNumber++;
      }
      const dateNumber = !date ? undefined : +date;
      const yearNumber = +years < 100 ? 2000 + +years: +years;
      if (Number.isNaN(yearNumber)) {
        throw new Error(`Bad year ${[date, monthNumber, years]}`);
      }
      return new Date(+yearNumber, monthNumber, dateNumber);
    }
    return new Date(parsedNumber);
  } catch (e) {
    Logger.error(`can't parse date ${dateInput} ${e}`);
    return null;
  }
}


export function parseExperience(experiences: RawExperience[]): Experience[] {
// parse date 01-12-2013
  return experiences.map( raw => ({
    ...raw,
    start: parseDate(raw.start),
    end: parseDate(raw.end),
  }));
}

export function parseEducationLevel(val: string): EducationLevelEnum {
  switch (val) {
    case 'Высшее образование':
    case 'Higher education':
      return EducationLevelEnum.HIGHER;
    case 'Среднее образование':
    case 'Secondary education':
      return EducationLevelEnum.SECONDARY;
    case 'Среднее специальное образование':
    case 'Secondary special education':
      return EducationLevelEnum.SPECIAL_SECONDARY;
    case 'Высшее образование (Бакалавр)':
    case 'Higher education (bachelor)':
      return EducationLevelEnum.BACHELOR;
    case 'Higher education (master)':
    case 'Высшее образование (Магистр)':
      return EducationLevelEnum.MASTER;
    case 'Высшее образование (Кандидат наук)':
    case 'Higher education (Candidate of Science)':
      return EducationLevelEnum.CANDIDATE;
    case 'Высшее образование (Доктор наук)':
      return EducationLevelEnum.DOCTOR;
    case 'Incomplete higher education':
    case 'Неоконченное высшее образование':
      return EducationLevelEnum.UNFINISHED_HIGHER;
    default:
      return EducationLevelEnum.UNKNOWN;
  }
}
