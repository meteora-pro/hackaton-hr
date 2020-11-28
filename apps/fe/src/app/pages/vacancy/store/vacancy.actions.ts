export class VacancyAction {
  public static readonly type = '[Vacancy] Add item';
  constructor(public payload: string) { }
}