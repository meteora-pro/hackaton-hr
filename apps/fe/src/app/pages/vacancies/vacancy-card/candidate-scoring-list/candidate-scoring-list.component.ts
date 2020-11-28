import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NestPaginationResponse } from '../../../../shared/models/pagination';
import { CandidateScoring } from '@meteora/api-interfaces';
import { VacancyCardState } from '../vacancy-card.state';
import { LoadScoringCandidates } from '../vacancy-card.actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ScoringModalComponent } from '../scoring-modal/scoring-modal.component';

@Component({
  selector: 'candidate-scoring-list',
  templateUrl: './candidate-scoring-list.component.html',
  styleUrls: ['./candidate-scoring-list.component.less']
})
export class CandidateScoringListComponent implements OnInit {

  constructor(private store: Store,
              private modal: NzModalService,
              private viewContainerRef: ViewContainerRef) { }

  @Select(VacancyCardState.pagination)
  pagination$: Observable<NestPaginationResponse<CandidateScoring>>;

  @Select(VacancyCardState.perPage)
  perPage$: Observable<number>;

  @Select(VacancyCardState.isLoadingPagination)
  isLoadingPagination$: Observable<boolean>;

  ngOnInit(): void {
  }

  handleChangePage(page: number) {
    this.store.dispatch(new LoadScoringCandidates(page));
  }

  openScoringModal(scoring: CandidateScoring) {
    this.modal.create({
      nzTitle: 'Отчет соответствия кандидата вакансии',
      nzContent: ScoringModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        candidateScoring: scoring
      },
      nzWidth: 780,
      nzFooter: null,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });
  }
}
