import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';

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
    salaryFrom: null,
    salaryTo: null,
    keySkills: [],
    description: null,
  });
  keySkillOptions = ['React', 'Angular'];

  formatterCurrency = (value: number) => (value === null ? null : `${value} ₽`);
  parserCurrency = (value: string) => value.replace(' ₽', '');
  optionList = ['test1', 'test2'];
  isLoading = true;

  ngOnInit(): void {}

  submitForm() {}

  onSearch(searchValue: string): void {
    console.log('[LOG] onSearch', searchValue);
  }
}
