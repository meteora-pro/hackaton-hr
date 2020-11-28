import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';

const routes: Routes = [
  {
    path: '',
    component: VacanciesListComponent,
  },
  {
    path: 'create',
    component: CreateVacancyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacanciesRoutingModule {}
