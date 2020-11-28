import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadVacancyCard } from './vacancy-card.actions';
import { Vacancy } from '@meteora/api-interfaces';
import { StoreStatus } from '../../../shared/models/store.status.enum';
import { tap } from 'rxjs/operators';
import { NestCrudService } from '../../../shared/services/nest-crud.service';
import { Injectable } from '@angular/core';

export interface VacancyCardStateModel {
  status: StoreStatus,
  vacancy: Vacancy;
}

type Ctx = StateContext<VacancyCardStateModel>;

@State<VacancyCardStateModel>({
  name: 'vacancyCard',
  defaults: {
    status: StoreStatus.New,
    vacancy: null,
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
    return this.nestCrudService.getEntityById('vacancy', id).pipe(
      tap((response: Vacancy) => {
        ctx.patchState({
          vacancy: response
        })
      })
    );
  }
}
