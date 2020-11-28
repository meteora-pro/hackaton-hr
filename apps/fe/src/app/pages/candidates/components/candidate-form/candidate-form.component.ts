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

  ngOnInit(): void {
    const defaultForm = {
      fullName: '',
      phone: null,
      birthDate: null,
      keySkills: [],
      experience: [],
      area: null,
      about: null,
      gender: null,
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
