import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadVacancies } from '../store/vacancy.actions';
import { VacancyState } from '../store/vacancy.state';
import { Observable } from 'rxjs';
import { Vacancy } from '@meteora/api-interfaces';
import { NestPaginationResponse } from '../../../shared/models/pagination';

@Component({
  selector: 'meteora-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacanciesListComponent implements OnInit {

  constructor(private store: Store) {}

  @Select(VacancyState.pagination)
  pagination$: Observable<NestPaginationResponse<Vacancy>>;

  @Select(VacancyState.perPage)
  perPage$: Observable<number>;

  @Select(VacancyState.isLoading)
  isLoading$: Observable<boolean>;

  ngOnInit(): void {
    this.store.dispatch(new LoadVacancies(0))
  }

  handleChangePage(page: number) {
    this.store.dispatch(new LoadVacancies(page));
  }

}
