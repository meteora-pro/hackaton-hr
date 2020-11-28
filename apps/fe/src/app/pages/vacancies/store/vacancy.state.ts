import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CreateVacancy } from './vacancy.actions';

export interface VacancyStateModel {
  items: string[];
}

@State<VacancyStateModel>({
  name: 'vacancy',
  defaults: {
    items: []
  }
})
export class VacancyState {

  @Selector()
  public static getState(state: VacancyStateModel) {
    return state;
  }

  @Action(CreateVacancy)
  public add(ctx: StateContext<VacancyStateModel>, { vacancy }: CreateVacancy) {
    const stateModel = ctx.getState();
    // stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
