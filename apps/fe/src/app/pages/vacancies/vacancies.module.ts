import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { VacancyState } from './store/vacancy.state';
import { NgxsModule } from '@ngxs/store';
import { NzTableModule } from 'ng-zorro-antd/table';
import { VacanciesRoutingModule } from './vacancies-routing.module';


@NgModule({
  declarations: [CreateVacancyComponent, VacanciesListComponent],
  imports: [
    CommonModule,
    NgxsModule.forFeature([VacancyState]),
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzAutocompleteModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCheckboxModule,
    NzButtonModule,
    NzTableModule,
    VacanciesRoutingModule
  ]
})
export class VacanciesModule { }
