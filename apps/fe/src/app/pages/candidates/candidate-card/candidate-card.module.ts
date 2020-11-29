import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCardComponent } from './card/candidate-card.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { CandidateCardState } from './candidate-card.state';
import { RouterModule, Routes } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { VacancyScoringListComponent } from './vacancy-scoring-list/vacancy-scoring-list.component';
import { MatchedVacancyModalComponent } from './matched-vacancy-modal/matched-vacancy-modal.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

const routes: Routes = [
  {
    path: ':id',
    component: CandidateCardComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([CandidateCardState]),
    RouterModule.forChild(routes),
    NzGridModule,
    NzButtonModule,
    NzProgressModule,
    NzTableModule,
    NzTagModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    NzAvatarModule,
    NzCollapseModule
  ],
  declarations: [
    CandidateCardComponent,
    VacancyScoringListComponent,
    MatchedVacancyModalComponent
  ],
})
export class CandidateCardModule { }
