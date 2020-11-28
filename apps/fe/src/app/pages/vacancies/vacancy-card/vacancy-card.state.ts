import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs/operators';

import { Candidate, Vacancy } from '@meteora/api-interfaces';

import { LoadVacancyCard } from './vacancy-card.actions';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { NestCrudService } from '../../../shared/services/nest-crud.service';

export interface VacancyCardStateModel {
  status: StoreStatus,
  vacancy: Vacancy;
  candidates: Candidate[],
}

type Ctx = StateContext<VacancyCardStateModel>;

@State<VacancyCardStateModel>({
  name: 'vacancyCard',
  defaults: {
    status: StoreStatus.New,
    vacancy: null,
    candidates: [],
  }
})
@Injectable()
export class VacancyCardState {

  constructor(private nestCrudService: NestCrudService<Vacancy>) {
  }

  @Selector()
  public static isLoading(state: VacancyCardStateModel) {
    return state.status === StoreStatus.Loading;
  }

  @Selector()
  public static vacancy(state: VacancyCardStateModel) {
    return state.vacancy;
  }

  @Action(LoadVacancyCard, { cancelUncompleted: true })
  public loadVacancyCard(ctx: Ctx, { id }: LoadVacancyCard) {
    ctx.patchState({
      status: StoreStatus.Loading,
    });
    return this.nestCrudService.getEntityById('vacancy', id).pipe(
      tap((response: Vacancy) => {
        ctx.patchState({
          vacancy: response,
          status: StoreStatus.Ready,
        })
      })
    );
  }
}
