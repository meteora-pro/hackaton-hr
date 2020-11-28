import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxsModule } from '@ngxs/store';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesListComponent } from './containers/list/candidates-list.component';
import { CandidateCardComponent } from './containers/card/candidate-card.component';
import { CandidatesState } from './store/candidates.state';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { HttpClientModule } from '@angular/common/http';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { CreateCandidateComponent } from './containers/create-candidate/create-candidate.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ExperiencesControlComponent } from './components/experiences-control/experiences-control.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    NzTableModule,
    NgxsModule.forFeature([CandidatesState]),
    NzTagModule,
    HttpClientModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzCheckboxModule,
    NzRadioModule,
    FormsModule,
    NzCardModule,
    NzIconModule,
    SharedModule,
  ],
  declarations: [
    CandidatesListComponent,
    CandidateCardComponent,
    CandidateFormComponent,
    CreateCandidateComponent,
    ExperiencesControlComponent
  ],
  providers: [
  ]
})
export class CandidatesModule { }
