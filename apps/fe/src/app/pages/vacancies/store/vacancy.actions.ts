import { Vacancy } from '@meteora/api-interfaces';

export class CreateVacancy {
  public static readonly type = '[Vacancy] CreateVacancy';
  constructor(public vacancy: Vacancy) { }
}

export class LoadVacancies {
  public static readonly type = '[Vacancy] LoadVacancies';
  constructor(public page: number) { }
}
