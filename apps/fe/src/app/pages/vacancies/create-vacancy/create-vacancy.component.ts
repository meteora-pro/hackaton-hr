import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { LoadVacancyTitles } from '../store/constructor-state/vacancy-constructor.actions';
import { Observable } from 'rxjs';
import { VacancyConstructorState } from '../store/constructor-state/vacancy-constructor.state';
import { ExperienceEnum } from '@meteora/api-interfaces';

@Component({
  selector: 'meteora-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVacancyComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store) {}
  formGroup = this.fb.group({
    name: '',
    vacancyNumber: null,
    vacancyOwner: null,
    experience: null,
    salaryFrom: null,
    salaryTo: null,
    keySkills: [],
    description: null,
  });
  keySkillOptions = ['React', 'Angular'];

  public readonly experienceOptions: {
    title: string;
    value: ExperienceEnum;
  }[] = [
    {
      title: 'Без опыта',
      value: ExperienceEnum.NO_EXPERIENCE,
    },
    {
      title: 'До года',
      value: ExperienceEnum.FROM_0_TO_1,
    },
    {
      title: 'От 1 до 3 лет',
      value: ExperienceEnum.FROM_1_TO_3,
    },
    {
      title: 'От 3 до 5 лет',
      value: ExperienceEnum.FROM_3_TO_5,
    },
    {
      title: 'Более 5 лет',
      value: ExperienceEnum.FROM_5,
    },
  ];

  formatterCurrency = (value: number) => (value === null ? null : `${value} ₽`);
  parserCurrency = (value: string) => value.replace(' ₽', '');
  optionList = ['test1', 'test2'];
  isLoading = true;

  @Select(VacancyConstructorState.titles)
  public titles$: Observable<string[]>;

  @Select(VacancyConstructorState.isTitleLoad)
  public isTitleLoad$: Observable<boolean>;

  public trackByFn(value) {
    return value;
  }

  ngOnInit(): void {}

  submitForm() {}

  onSearch(searchValue: string): void {
    this.store.dispatch(new LoadVacancyTitles(searchValue));
  }
}
