import { ExperienceEnum } from '@meteora/api-interfaces';

export class LoadVacancyTitles {
  public static readonly type = '[Vacancy constructor] Load vacancy titles';
  constructor(public title: string) { }
}

export class LoadSkills {
  public static readonly type = '[Vacancy constructor] Load vacancy skills';
  constructor(public title: string, public experience: ExperienceEnum) {
  }
}
