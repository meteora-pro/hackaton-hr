
export class LoadVacancyCard {
  public static readonly type = '[VacancyCard] LoadVacancyCard';
  constructor(public id: number) { }
}

export class LoadScoringCandidates {
  public static readonly type = '[VacancyCard] LoadScoringCandidates';
  constructor(public page: number) { }
}
