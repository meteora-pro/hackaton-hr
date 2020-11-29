import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesListComponent } from './containers/list/candidates-list.component';
import { NestCrudService } from '../../shared/services/nest-crud.service';
import { CreateCandidateComponent } from './containers/create-candidate/create-candidate.component';

const routes: Routes = [
  {
    path: 'list', component: CandidatesListComponent,
  },
  {
    path: 'create', component: CreateCandidateComponent
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
