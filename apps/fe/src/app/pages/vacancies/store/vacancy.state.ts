import { Action, Selector, State, StateContext } from '@ngxs/store';
import {  LoadVacancies } from './vacancy.actions';
import { NestPaginationResponse } from '../../../shared/models/pagination';
import { Vacancy } from '@meteora/api-interfaces';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { tap } from 'rxjs/operators';
import { NestCrudService } from '../../../shared/services/nest-crud.service';
import { Injectable } from '@angular/core';
import { VacancyConstructorState } from './constructor-state/vacancy-constructor.state';
import { VacancyCardState } from '../vacancy-card/vacancy-card.state';
import { CreateVacancy } from './constructor-state/vacancy-constructor.actions';

export interface VacancyStateModel {
  pagination: NestPaginationResponse<Vacancy>,
  status: StoreStatus,
  perPage: number;
}

type Ctx = StateContext<VacancyStateModel>;

@State<VacancyStateModel>({
  name: 'vacancy',
  defaults: {
    pagination: {
      count: null,
      page: 0,
      pageCount: null,
      total: null,
      data: [],
    },
    perPage: 10,
    status: StoreStatus.New,
  },
  children: [VacancyConstructorState, VacancyCardState]
})
@Injectable()
export class VacancyState {

  constructor(private nestCrudService: NestCrudService<Vacancy>) {
  }

  @Selector()
  public static isLoading(state: VacancyStateModel) {
    return state.status === StoreStatus.Loading;
  }

  @Selector()
  public static pagination(state: VacancyStateModel) {
    return state.pagination;
  }

  @Selector()
  public static perPage(state: VacancyStateModel) {
    return state.perPage;
  }

  @Action(LoadVacancies)
  public load(ctx: Ctx, { page }: LoadVacancies) {

    const state = ctx.getState();
    ctx.patchState({
      status: StoreStatus.Loading,
      pagination: {
        ...state.pagination,
        page,
      }
    });
    return this.nestCrudService.getEntities('vacancy', {
      page: page || state.pagination.page,
      limit: state.perPage,
      sort: {
        field: 'id',
        order: 'DESC'
      }
    }).pipe(
      tap((response: NestPaginationResponse<Vacancy>) => {
        ctx.patchState({
          status: StoreStatus.Ready,
          pagination: response,
        })
      })
    );
  }

}
