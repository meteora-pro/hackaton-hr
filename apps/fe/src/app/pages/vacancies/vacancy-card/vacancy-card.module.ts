import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacancyCardComponent } from './vacancy-card/vacancy-card.component';
import { NgxsModule } from '@ngxs/store';
import { VacancyCardState } from './vacancy-card.state';
import { RouterModule, Routes } from '@angular/router';
import { CandidateScoringListComponent } from './candidate-scoring-list/candidate-scoring-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SharedModule } from '../../../shared/shared.module';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ScoringModalComponent } from './scoring-modal/scoring-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    RouterModule.forChild(routes),
    NzTableModule,
    SharedModule,
    NzProgressModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzTagModule,
    NzTypographyModule,
    NzIconModule
  ],
  declarations: [VacancyCardComponent, CandidateScoringListComponent, ScoringModalComponent],
})
export class VacancyCardModule {
}
