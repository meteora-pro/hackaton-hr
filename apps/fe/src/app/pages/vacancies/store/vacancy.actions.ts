import { Vacancy } from '@meteora/api-interfaces';

export class CreateVacancy {
  public static readonly type = '[Vacancy] CreateVacancy';
  constructor(public vacancy: Vacancy) { }
}

export class LoadVacancies {
  public static readonly type = '[Vacancy] LoadVacancies';
  constructor(public page: number) { }
}

export class LoadVacancyCard {
  public static readonly type = '[Vacancy] LoadVacancyCard';
  constructor(public id: number) { }
}
