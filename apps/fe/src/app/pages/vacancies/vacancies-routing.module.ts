import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { ConstructorComponent } from './constructor/constructor.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list',
  },
  {
    path: 'list',
    component: VacanciesListComponent,
  },
  {
    path: 'constructor',
    component: ConstructorComponent,
  },
  {
    path: 'card',
    component: CardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacanciesRoutingModule {}
