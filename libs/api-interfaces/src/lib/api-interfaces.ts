
export enum ScheduleEnum {
  FULL_DAY = 'FULL_DAY',
  PART_TIME = 'PART_TIME'
}

export enum ExperienceEnum {
  NO_EXPERIENCE = 'NO_EXPERIENCE',
  FROM_0_TO_1 = 'FROM_0_TO_1',
  FROM_1_TO_3 = 'FROM_1_TO_3',
  FROM_3_TO_5 = 'FROM_3_TO_5',
  FROM_5 = 'FROM_5',
  UNKNOWN = 'UNKNOWN'
}

export interface Specialization {
  readonly id: number;
  name: string;
  profareaName: string;
}

export enum EducationLevelEnum {
  UNKNOWN = 'UNKNOWN',
  SECONDARY = 'SECONDARY',
  SPECIAL_SECONDARY = 'SPECIAL_SECONDARY',
  UNFINISHED_HIGHER = 'UNFINISHED_HIGHER',
  HIGHER = 'HIGHER',
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  CANDIDATE = 'CANDIDATE',
  DOCTOR = 'DOCTOR'
}

export interface Education {
  "year": number;
  "name": string;
  "organization": string;
}

export enum LanguageEnum {
  RUSSIAN = 'RUSSIAN',
  ENGLISH = 'ENGLISH',
  OTHER = 'OTHER'
}

export enum LanguageLevelEnum {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  NATIVE = 'NATIVE',
  UNKNOWN = 'UNKNOWN'
}

export interface Language {
  name: LanguageEnum;
  level: LanguageLevelEnum;
}

export interface Experience {
  start: Date;
  end?: Date;
  position: string;
  description: string;
}

export interface Vacancy {
  readonly id: number;
  name: string;
  vacancyNumber: string;
  vacancyOwner: string;
  areaName?: string; // справочник из hh
  address?: string;
  salaryFrom: number;
  salaryTo: number;
  specialization: Specialization[];
  experience: ExperienceEnum;
  salaryGross: boolean;
  schedule: ScheduleEnum;
  description: string;
  keySkills: string[];
  createdAt: Date;
  publishedAt: Date;
  closedAt: Date;
  hasTest: boolean;
  testUrl: string;
  isOwnVacancy: boolean;
  hhUrl: string;
}

export interface Candidate {
  readonly id: number;
  fullName: string;
  phone: string;
  birthDate: Date;
  gender:  "male" | "female" | "unknown";
  area: string;
  specialization: Specialization[];
  title: string;
  salary: number;
  educationLevel: EducationLevelEnum;
  educations: Education[];
  languages: Language[];
  experiences: Experience[];
  skillSet: string[];
  skills: string;
  about: string;
}

export interface Scoring {
  positiveTags: string[];
  negativeTags: string[];
  percent: number;
  matchingSkills: string[];
  additionalSkills: string[];
}

export interface CandidateScoring {
  candidate: Candidate,
  scoring: Scoring,
}

export interface VacancyScoring {
  vacancy: Vacancy,
  scoring: Scoring,
}
