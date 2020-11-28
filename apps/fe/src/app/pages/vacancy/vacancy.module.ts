import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { VacancyState } from './store/vacancy.state';
import { VacancyFormComponent } from './components/vacancy-form/vacancy-form.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

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
    NgxsModule.forFeature([VacancyState]),
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzAutocompleteModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCheckboxModule
  ],
  declarations: [
    VacancyFormComponent,
    CreateVacancyComponent
  ],
})
export class VacancyModule { }
