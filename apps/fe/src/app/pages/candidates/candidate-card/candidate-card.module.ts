import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCardComponent } from './card/candidate-card.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { CandidateCardState } from './candidate-card.state';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    component: CandidateCardComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([CandidateCardState]),
    RouterModule.forChild(routes)
  ],
  declarations: [
    CandidateCardComponent
  ],
})
export class CandidateCardModule { }
