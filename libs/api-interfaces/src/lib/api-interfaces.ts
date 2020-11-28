
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
}

export interface Specialization {
  readonly id: number;
  name: string;
  profareaName: string;
}

export enum EducationLevelEnum {
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

export enum languageEnum {
  RUSSIAN = 'RUSSIAN',
  ENGLISH = 'ENGLISH'
}

export enum languageLevelEnum {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export interface Language {
  name: languageEnum;
  level: languageLevelEnum;
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
  responseLetterRequired: boolean;
  areaName?: string; // справочник из hh
  address?: string;
  salaryFrom: number;
  specialization: Specialization;
  experience: ExperienceEnum;
  salaryTo: number;
  salaryGross: boolean;
  schedule: ScheduleEnum;
  description: string;
  keySkills: string[];
  createdAt: Date;
  publishedAt: Date;
  closedAt: Date;
  hasTest: boolean;
  testUrl: string;
}

export interface Candidate {
  readonly id: number;
  birthDate: Date;
  gender:  "male" | "female";
  area: string;
  specialization: Specialization;
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
