import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CreateVacancy, LoadVacancies } from './vacancy.actions';
import { NestPaginationResponse } from '../../../shared/models/pagination';
import { Vacancy } from '@meteora/api-interfaces';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { tap } from 'rxjs/operators';
import { CandidatesStateModel } from '../../candidates/store/candidates.state';
import { NestCrudService } from '../../../shared/services/nest-crud.service';
import { Injectable } from '@angular/core';

export interface VacancyStateModel {
  pagination: NestPaginationResponse<Vacancy>,
  status: StoreStatus,
  perPage: number;
}

type Ctx = StateContext<CandidatesStateModel>;

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
    perPage: 25,
    status: StoreStatus.New,
  }
})
@Injectable()
export class VacancyState {

  constructor(private nestCrudService: NestCrudService<Vacancy>) {
  }

  @Selector()
  public static vacancies(state: VacancyStateModel) {
    return state.pagination.data;
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
    }).pipe(
      tap((response: NestPaginationResponse<Vacancy>) => {
        ctx.patchState({
          status: StoreStatus.Ready,
          pagination: response,
        })
      })
    );
  }

  @Action(CreateVacancy)
  public add(ctx: StateContext<VacancyStateModel>, { vacancy }: CreateVacancy) {
    const stateModel = ctx.getState();
    // stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
