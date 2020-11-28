import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesListComponent } from './list/candidates-list.component';
import { CandidateCardComponent } from './card/candidate-card.component';
import { NestCrudService } from '../../shared/services/nest-crud.service';

const routes: Routes = [
  {
    path: 'list', component: CandidatesListComponent,
  },
  {
    path: 'card', component: CandidateCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    NestCrudService,
  ]
})
export class CandidatesRoutingModule { }
