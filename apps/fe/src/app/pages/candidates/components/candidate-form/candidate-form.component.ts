import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Candidate } from '@meteora/api-interfaces';

@Component({
  selector: 'meteora-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateFormComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  @Input()
  candidate: Candidate;

  @Output()
  readonly handleSubmit = new EventEmitter<Candidate>();

  formGroup: FormGroup;
  keySkillOptions = ['React', 'Angular'];

  educationLevelList = [
    {value: 'SECONDARY', title: ''},
    {value: 'SPECIAL_SECONDARY', title: ''},
    {value: 'UNFINISHED_HIGHER', title: 'Незаконченное высшее'},
    {value: 'HIGHER', title: 'Высшее'},
    {value: 'BACHELOR', title: 'Бакавриат'},
    {value: 'MASTER', title: 'Магистр'},
    {value: 'CANDIDATE', title: 'Кандидат наук'},
    {value: 'DOCTOR', title: 'Доктор'}
  ];

  ngOnInit(): void {
    const defaultForm = {
      fullName: '',
      phone: null,
      birthDate: null,
      skillSet: [],
      experiences: [],
      area: null,
      about: null,
      gender: null,
      title: null,
    };
    this.formGroup = this.fb.group({
      ...defaultForm,
      ...this.candidate,
    });
  }

  submitForm() {
    this.handleSubmit.emit(this.formGroup.value);
  }
}
