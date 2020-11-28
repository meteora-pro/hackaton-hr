import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'meteora-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVacancyComponent implements OnInit {

  constructor(private fb: FormBuilder) {}
  formGroup = this.fb.group({
    name: '',
    salaryFrom: null,
    salaryTo: null,
    keySkills: [],
    description: null,
  });
  filteredOptions = ['Frontend', 'Backend'];
  keySkillOptions = ['React', 'Angular'];

  formatterCurrency = (value: number) => value === null ? null : `${value} ₽`;
  parserCurrency = (value: string) => value.replace(' ₽', '');

  ngOnInit(): void {
  }

  submitForm() {

  }
}
