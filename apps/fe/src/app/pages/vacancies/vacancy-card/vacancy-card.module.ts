import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacancyCardComponent } from './vacancy-card/vacancy-card.component';
import { NgxsModule } from '@ngxs/store';
import { VacancyCardState } from './vacancy-card.state';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    component: VacancyCardComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([VacancyCardState]),
    RouterModule.forChild(routes)
  ],
  declarations: [VacancyCardComponent],
})
export class VacancyCardModule {
}
