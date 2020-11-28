import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { VacancyState } from './store/vacancy.state';
import { RouterModule, Routes } from '@angular/router';
import { VacancyFormComponent } from './components/vacancy-form/vacancy-form.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list',
  },
  {
    path: 'create',
    component: CreateVacancyComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([VacancyState])
  ],
  declarations: [
    VacancyFormComponent,
    CreateVacancyComponent
  ],
})
export class VacancyModule { }
