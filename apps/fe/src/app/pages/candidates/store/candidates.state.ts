import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateCandidates, LoadCandidates } from './candidates.actions';
import { Candidate } from '@meteora/api-interfaces';
import { NestPaginationResponse } from '../../../shared/models/pagination';
import { NestCrudService } from '../../../shared/services/nest-crud.service';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface CandidatesStateModel {
  pagination: NestPaginationResponse<Candidate>,
  status: StoreStatus,
  perPage: number;
}

type Ctx = StateContext<CandidatesStateModel>;

@State<CandidatesStateModel>({
  name: 'candidates',
  defaults: {
    pagination: {
      count: null,
      page: 0,
      pageCount: null,
      total: null,
      data: [],
    },
    perPage: 25,
    status: StoreStatus.New,
  }
})
@Injectable()
export class CandidatesState {

  constructor(private nestCrudService: NestCrudService<Candidate>) {
  }

  @Selector()
  public static candidates(state: CandidatesStateModel): Candidate[] {
    return state.pagination.data;
  }

  @Action(LoadCandidates)
  public load(ctx: StateContext<CandidatesStateModel>) {
    ctx.patchState({
      status: StoreStatus.Loading,
    });
    const state = ctx.getState();

    return this.nestCrudService.getEntities('candidate', {
      page: state.pagination.page,
      limit: state.perPage,
    }).pipe(
      tap((response: NestPaginationResponse<Candidate>) => {
        ctx.patchState({
          status: StoreStatus.Ready,
          pagination: response,
        })
      })
    );
  }

  @Action(CreateCandidates)
  public createCandidates(ctx: Ctx, { candidate }: CreateCandidates) {
    return this.nestCrudService.addItem('candidate', candidate);
  }

}
