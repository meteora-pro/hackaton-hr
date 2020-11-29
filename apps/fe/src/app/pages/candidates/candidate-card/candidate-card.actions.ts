
export class LoadCandidateById {
  public static readonly type = '[CandidateCard] LoadCandidateById';
  constructor(public id: number) { }
}

export class LoadScoringVacancies {
  public static readonly type = '[CandidateCard] LoadScoringVacancies';
  constructor(public page: number) { }
}
