import { ExperienceEnum, Vacancy } from '@meteora/api-interfaces';

export class LoadVacancyTitles {
  public static readonly type = '[Vacancy constructor] Load vacancy titles';
  constructor(public title: string) { }
}

export class LoadSkills {
  public static readonly type = '[Vacancy constructor] Load vacancy skills';
  constructor(public title: string, public experience: ExperienceEnum) { }

}

export class CreateVacancy {
  public static readonly type = '[Vacancy constructor] Create vacancy';
  constructor(public vacancy: Vacancy) { }
}
