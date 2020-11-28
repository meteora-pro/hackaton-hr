import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacanciesRoutingModule } from './vacancies-routing.module';
import { ConstructorComponent } from './constructor/constructor.component';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [ConstructorComponent, VacanciesListComponent, CardComponent],
  imports: [
    CommonModule,
    VacanciesRoutingModule
  ]
})
export class VacanciesModule { }
