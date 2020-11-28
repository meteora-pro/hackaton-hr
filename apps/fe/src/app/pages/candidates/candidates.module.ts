import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesListComponent } from './list/candidates-list.component';
import { CandidateCardComponent } from './card/candidate-card.component';


@NgModule({
  declarations: [CandidatesListComponent, CandidateCardComponent],
  imports: [
    CommonModule,
    CandidatesRoutingModule
  ]
})
export class CandidatesModule { }
