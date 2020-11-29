import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs/operators';

import { CandidateScoring, Vacancy } from '@meteora/api-interfaces';

import { LoadScoringCandidates, LoadVacancyCard } from './vacancy-card.actions';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { NestCrudService } from '../../../shared/services/nest-crud.service';
import { NestPaginationResponse } from '../../../shared/models/pagination';

export interface VacancyCardStateModel {
  status: StoreStatus,
  vacancy: Vacancy;
  vacancyId: number;
  perPage: number;
  paginationStatus: StoreStatus,
  pagination: NestPaginationResponse<CandidateScoring>;
}

type Ctx = StateContext<VacancyCardStateModel>;

@State<VacancyCardStateModel>({
  name: 'vacancyCard',
  defaults: {
    status: StoreStatus.New,
    vacancy: null,
    vacancyId: null,
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
export class VacancyCardState {

  constructor(private nestCrudService: NestCrudService<Vacancy>) {
  }

  @Selector()
  public static isLoading(state: VacancyCardStateModel): boolean {
    return state.status === StoreStatus.Loading;
  }

  @Selector()
  public static vacancy(state: VacancyCardStateModel): Vacancy {
    return state.vacancy;
  }

  @Selector()
  public static perPage(state: VacancyCardStateModel): number{
    return state.perPage;
  }

  @Selector()
  public static pagination(state: VacancyCardStateModel): NestPaginationResponse<CandidateScoring> {
    return state.pagination;
  }

  @Selector()
  public static isLoadingPagination(state: VacancyCardStateModel): boolean {
    return state.paginationStatus === StoreStatus.Loading;
  }

  @Action(LoadVacancyCard, { cancelUncompleted: true })
  public loadVacancyCard(ctx: Ctx, { id }: LoadVacancyCard) {
    ctx.patchState({
      status: StoreStatus.Loading,
      vacancyId: id,
    });
    ctx.dispatch(new LoadScoringCandidates(0))
    return this.nestCrudService.getEntityById('vacancy', id).pipe(
      tap((response: Vacancy) => {
        ctx.patchState({
          vacancy: response,
          status: StoreStatus.Ready,
        })
      })
    );
  }

  @Action(LoadScoringCandidates, { cancelUncompleted: true})
  public loadScoringCandidates(ctx: Ctx, { page }: LoadScoringCandidates) {
    const state = ctx.getState();
    ctx.patchState({
      paginationStatus: StoreStatus.Loading,
    });
    return this.nestCrudService.getEntities<CandidateScoring>(`vacancy/${state.vacancyId}/matched`, {
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
}
