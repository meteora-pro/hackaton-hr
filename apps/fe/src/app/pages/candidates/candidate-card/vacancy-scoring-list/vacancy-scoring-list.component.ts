import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NestPaginationResponse } from '../../../../shared/models/pagination';
import { VacancyScoring } from '@meteora/api-interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CandidateCardState } from '../candidate-card.state';
import { MatchedVacancyModalComponent } from '../matched-vacancy-modal/matched-vacancy-modal.component';
import { LoadScoringVacancies } from '../candidate-card.actions';

@Component({
  selector: 'vacancy-scoring-list',
  templateUrl: './vacancy-scoring-list.component.html',
  styleUrls: ['./vacancy-scoring-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyScoringListComponent {

  constructor(private store: Store,
              private modal: NzModalService,
              private viewContainerRef: ViewContainerRef) { }

  @Select(CandidateCardState.pagination)
  pagination$: Observable<NestPaginationResponse<VacancyScoring>>;

  @Select(CandidateCardState.perPage)
  perPage$: Observable<number>;

  @Select(CandidateCardState.isLoadingPagination)
  isLoadingPagination$: Observable<boolean>;

  handleChangePage(page: number) {
    this.store.dispatch(new LoadScoringVacancies(page));
  }

  openScoringModal(scoring: VacancyScoring) {
    this.modal.create({
      nzTitle: 'Отчет соответствия кандидата вакансии',
      nzContent: MatchedVacancyModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        scoring: scoring.scoring
      },
      nzWidth: 780,
      nzFooter: null,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });
  }
}
