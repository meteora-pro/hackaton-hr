import { Candidate } from '@meteora/api-interfaces';

export class LoadCandidates {
  public static readonly type = '[Candidates] LoadCandidates';
  constructor() { }
}

export class CreateCandidates {
  public static readonly type = '[Candidates] CreateCandidates';
  constructor(public candidate: Candidate) { }
}
