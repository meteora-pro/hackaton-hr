import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadVacancyTitles } from './vacancy-constructor.actions';
import { NestCrudService } from '../../../../shared/services/nest-crud.service';
import { PredictorService } from '../../services/predictor.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface ConstructorStateModel {
  titles: string[];
  titleLoads: boolean;
}

type Ctx = StateContext<ConstructorStateModel>;

@State<ConstructorStateModel>({
  name: 'vacancyConstructor',
  defaults: {
    titles: [],
    titleLoads: false,
  },
})
@Injectable()
export class VacancyConstructorState {
  constructor(private predictorService: PredictorService) {}

  @Selector()
  public static titles(state: ConstructorStateModel): string[] {
    return state.titles;
  }

  @Selector()
  public static isTitleLoad(state: ConstructorStateModel): boolean {
    return state.titleLoads;
  }

  @Action(LoadVacancyTitles, { cancelUncompleted: true })
  public onLoadVacancyTitles(ctx: Ctx, action: LoadVacancyTitles): Observable<void> {
    ctx.patchState({titleLoads: true})
    return this.predictorService.getTitles(action.title).pipe(
      tap((result) => {
        ctx.patchState({ titleLoads: false, titles: result });
      }),
      map(() => undefined),
    );
  }
}
