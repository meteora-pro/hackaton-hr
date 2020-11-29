import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  CreateVacancy,
  LoadSkills,
  LoadVacancyTitles,
} from './vacancy-constructor.actions';
import { PredictorService } from '../../services/predictor.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NestCrudService } from '../../../../shared/services/nest-crud.service';
import { Vacancy } from '../../../../../../../../libs/api-interfaces/src';
import { ShowNotification } from '../../../../core/store/core.actions';
import { Navigate } from '@ngxs/router-plugin';

export interface ConstructorStateModel {
  titles: string[];
  skills: { name: string, preset: boolean }[];
  skillsLoads: boolean;
  titleLoads: boolean;
}

type Ctx = StateContext<ConstructorStateModel>;

@State<ConstructorStateModel>({
  name: 'vacancyConstructor',
  defaults: {
    titles: [],
    skills: [],
    skillsLoads: false,
    titleLoads: false,
  },
})
@Injectable()
export class VacancyConstructorState {
  constructor(
    private predictorService: PredictorService,
    private crudService: NestCrudService<Vacancy>
  ) {}

  @Selector()
  public static titles(state: ConstructorStateModel): string[] {
    return state.titles;
  }

  @Selector()
  public static isTitleLoad(state: ConstructorStateModel): boolean {
    return state.titleLoads;
  }

  @Selector()
  public static skills(state: ConstructorStateModel): { name: string, preset: boolean }[] {
    return state.skills;
  }


  @Selector()
  public static presetSkills(state: ConstructorStateModel): string[] {
    return state.skills.filter(skill => skill.preset).map(skill => skill.name);
  }

  @Selector()
  public static isSkillsLoad(state: ConstructorStateModel): boolean {
    return state.skillsLoads;
  }

  @Action(LoadVacancyTitles, { cancelUncompleted: true })
  public onLoadVacancyTitles(
    ctx: Ctx,
    action: LoadVacancyTitles
  ): Observable<void> {
    ctx.patchState({ titleLoads: true });
    return this.predictorService.getTitles(action.title).pipe(
      tap((result) => {
        ctx.patchState({ titleLoads: false, titles: result });
      }),
      map(() => undefined)
    );
  }

  @Action(LoadSkills, { cancelUncompleted: true })
  public onLoadSkills(
    ctx: Ctx,
    { title, experience }: LoadSkills
  ): Observable<void> {
    ctx.patchState({ skillsLoads: true });
    return this.predictorService.getSkills(title, experience).pipe(
      tap((result) => {
        ctx.patchState({ skillsLoads: false, skills: result });
      }),
      map(() => undefined)
    );
  }

  @Action(CreateVacancy)
  public onCreateVacancy(
    ctx: Ctx,
    { vacancy }: CreateVacancy
  ): Observable<void> {
    vacancy.publishedAt = new Date();

    return this.crudService.addItem('vacancy', vacancy).pipe(
      tap((response) =>
        ctx.dispatch([
          new ShowNotification('Отлично!', 'Вакансия успешно создана!'),
          new Navigate([`/vacancy/${response.id}`]),
        ])
      ),
      map(() => undefined)
    );
  }
}
