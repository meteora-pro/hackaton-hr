import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadCandidateById } from './candidate-card.actions';
import { Candidate } from '@meteora/api-interfaces';
import { Injectable } from '@angular/core';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { NestCrudService } from '../../../shared/services/nest-crud.service';

export interface CandidateCardStateModel {
  candidate: Candidate,
  status: StoreStatus,
}

type Ctx = StateContext<CandidateCardStateModel>;

@State<CandidateCardStateModel>({
  name: 'candidateCard',
  defaults: {
    candidate: null,
    status: StoreStatus.New,
  }
})
@Injectable()
export class CandidateCardState {

  constructor(private nestCrudService: NestCrudService<Candidate>) {
  }

  @Selector()
  public static candidate(state: CandidateCardStateModel): Candidate {
    return state.candidate;
  }

  @Action(LoadCandidateById)
  public loadCandidateById(ctx: Ctx, { id }: LoadCandidateById) {
    return this.nestCrudService.getEntityById('candidate', id).pipe(

    )
  }
}
