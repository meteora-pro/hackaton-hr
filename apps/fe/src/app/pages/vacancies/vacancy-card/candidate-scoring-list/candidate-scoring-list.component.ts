import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NestPaginationResponse } from '../../../../shared/models/pagination';
import { CandidateScoring } from '@meteora/api-interfaces';
import { VacancyCardState } from '../vacancy-card.state';
import { LoadScoringCandidates } from '../vacancy-card.actions';

@Component({
  selector: 'meteora-candidate-scoring-list',
  templateUrl: './candidate-scoring-list.component.html',
  styleUrls: ['./candidate-scoring-list.component.less']
})
export class CandidateScoringListComponent implements OnInit {

  constructor(private store: Store) { }

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
}
