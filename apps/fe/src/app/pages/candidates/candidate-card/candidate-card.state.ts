import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApproveCandidate, LoadCandidateById, LoadScoringVacancies, RejectCandidate } from './candidate-card.actions';
import { Candidate, VacancyScoring } from '@meteora/api-interfaces';
import { Injectable } from '@angular/core';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { NestCrudService } from '../../../shared/services/nest-crud.service';
import { tap } from 'rxjs/operators';
import { NestPaginationResponse } from '../../../shared/models/pagination';
import { ShowNotification } from '../../../core/store/core.actions';

export interface CandidateCardStateModel {
  candidate: Candidate,
  candidateId: number; // TODO придумать решение получше. Например, доставать значение из роута. Нужен для матчинка вакансий
  status: StoreStatus,
  perPage: number;
  paginationStatus: StoreStatus,
  pagination: NestPaginationResponse<VacancyScoring>;
}

type Ctx = StateContext<CandidateCardStateModel>;

@State<CandidateCardStateModel>({
  name: 'candidateCard',
  defaults: {
    candidate: null,
    status: StoreStatus.New,
    candidateId: null,
    perPage: 10,
    paginationStatus: StoreStatus.New,
    pagination: {
      count: null,
      page: 0,
      pageCount: null,
      total: null,
      data: [],
    },
  }
})
@Injectable()
export class CandidateCardState {

  constructor(private nestCrudService: NestCrudService<Candidate>) {
  }

  @Selector()
  public static pagination(state: CandidateCardStateModel) {
    return state.pagination;
  }

  @Selector()
  public static candidate(state: CandidateCardStateModel): Candidate {
    return state.candidate;
  }

  @Selector()
  public static isLoadingPagination(state: CandidateCardStateModel): boolean {
    return state.paginationStatus === StoreStatus.Loading;
  }

  @Selector()
  public static perPage(state: CandidateCardStateModel): number{
    return state.perPage;
  }

  @Action(LoadCandidateById)
  public loadCandidateById(ctx: Ctx, { id }: LoadCandidateById) {
    ctx.patchState({
      status: StoreStatus.Loading,
      candidateId: id,
    });
    ctx.dispatch(new LoadScoringVacancies(0));
    return this.nestCrudService.getEntityById('candidate', id).pipe(
      tap((response: Candidate) => {
        ctx.patchState({
          status: StoreStatus.Ready,
          candidate: response,
        })
      })
    )
  }

  @Action(LoadScoringVacancies, { cancelUncompleted: true})
  public loadScoringCandidates(ctx: Ctx, { page }: LoadScoringVacancies) {
    const state = ctx.getState();
    ctx.patchState({
      paginationStatus: StoreStatus.Loading,
    });
    return this.nestCrudService.getEntities<VacancyScoring>(`candidate/${state.candidateId}/matched`, {
      page: page || state.pagination.page,
      limit: state.perPage,
    }).pipe(
      tap((response) => {
        ctx.patchState({
          paginationStatus: StoreStatus.Ready,
          pagination: response
        });
      })
    )
  }

  @Action(RejectCandidate)
  public rejectCandidate(ctx: Ctx) {
    ctx.dispatch(new ShowNotification('', 'Кандидату отправлен отказ'));
  }

  @Action(ApproveCandidate)
  public approveCandidate(ctx: Ctx) {
    ctx.dispatch(new ShowNotification('', 'Кандидату добавлен в процесс'));
  }
}
