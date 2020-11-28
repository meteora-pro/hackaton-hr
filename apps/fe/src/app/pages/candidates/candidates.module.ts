import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxsModule } from '@ngxs/store';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesListComponent } from './list/candidates-list.component';
import { CandidateCardComponent } from './card/candidate-card.component';
import { CandidatesState } from './store/candidates.state';
import { WorkExperienceYearsPipe } from './pipes/work-experience-years.pipe';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    NzTableModule,
    NgxsModule.forFeature([CandidatesState]),
    NzTagModule,
    HttpClientModule,
  ],
  declarations: [CandidatesListComponent, CandidateCardComponent, WorkExperienceYearsPipe],
})
export class CandidatesModule { }
