import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadCandidates } from './candidates.actions';
import { Candidate } from '@meteora/api-interfaces';
import { NestPagination, NestPaginationResponse } from '../../../shared/models/pagination';
import { NestCrudService } from '../../../shared/services/nest-crud.service';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { tap } from 'rxjs/operators';

export interface CandidatesStateModel {
  pagination: NestPaginationResponse<Candidate>,
  status: StoreStatus,
  perPage: number;
}

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
export class CandidatesState {

  constructor(private nestCrudService: NestCrudService<Candidate>) {
  }

  @Selector()
  public static candidates(state: CandidatesStateModel): Candidate[] {
    return state.pagination.data;
  }

  @Action(LoadCandidates)
  public load(ctx: StateContext<CandidatesStateModel>, { payload }: LoadCandidates) {
    ctx.patchState({
      status: StoreStatus.Loading,
    });
    const state = ctx.getState();

    return this.nestCrudService.getEntities('candidates', state.perPage, state.pagination.page).pipe(
      tap((response: NestPaginationResponse<Candidate>) => {
        ctx.patchState({
          status: StoreStatus.Ready,
          pagination: response,
        })
      })
    );
  }
}