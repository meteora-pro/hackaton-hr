import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CreateVacancy, LoadSkills, LoadVacancyTitles } from '../store/constructor-state/vacancy-constructor.actions';
import { Observable, Subject } from 'rxjs';
import { VacancyConstructorState } from '../store/constructor-state/vacancy-constructor.state';
import { ExperienceEnum, Vacancy } from '@meteora/api-interfaces';
import { distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';

import isEqual from 'lodash-es/isEqual';


@Component({
  selector: 'meteora-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVacancyComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private store: Store) {}
  formGroup = this.fb.group({
    name: ['', Validators.required],
    vacancyOwner: null,
    experience: [null, Validators.required],
    salaryFrom: null,
    salaryTo: null,
    keySkills: [null, Validators.required],
    description: [null, [Validators.required, Validators.minLength(5)]],
  });
  keySkillOptions = ['React', 'Angular'];

  private destroy$ = new Subject();

  public readonly experienceOptions: {
    title: string;
    value: ExperienceEnum;
  }[] = [
    {
      title: 'Intern',
      value: ExperienceEnum.NO_EXPERIENCE,
    },
    {
      title: 'Junior',
      value: ExperienceEnum.FROM_0_TO_1,
    },
    {
      title: 'Middle',
      value: ExperienceEnum.FROM_1_TO_3,
    },
    {
      title: 'Senior',
      value: ExperienceEnum.FROM_3_TO_5,
    },
    {
      title: 'Lead',
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


  @Select(VacancyConstructorState.skills)
  public skills$: Observable<string[]>;

  @Select(VacancyConstructorState.isSkillsLoad)
  public isSkillsLoad$: Observable<boolean>;

  public trackByFn(value) {
    return value;
  }

  ngOnInit(): void {
    this.formChangeObserver();
  }

  submitForm() {
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[i].markAsDirty();
      this.formGroup.controls[i].updateValueAndValidity();
    }

    if (!this.formGroup.valid) {
      return;
    }

    this.store.dispatch(new CreateVacancy(this.formGroup.value as Vacancy));
  }

  onSearch(searchValue: string): void {
    this.store.dispatch(new LoadVacancyTitles(searchValue));
  }

  private formChangeObserver() {
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroy$),
      map(formValue => ({name: formValue.name, experience: formValue.experience})),
      distinctUntilChanged(isEqual),
      filter(({ name, experience }) => !!name && !!experience),
      tap(({ name, experience }) => this.store.dispatch(new LoadSkills(name, experience)))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
