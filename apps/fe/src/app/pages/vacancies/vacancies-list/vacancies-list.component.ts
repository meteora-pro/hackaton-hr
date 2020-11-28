import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadVacancies } from '../store/vacancy.actions';
import { VacancyState } from '../store/vacancy.state';
import { Observable } from 'rxjs';
import { Vacancy } from '@meteora/api-interfaces';

@Component({
  selector: 'meteora-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.less'],
})
export class VacanciesListComponent implements OnInit {

  constructor(private store: Store) {}

  @Select(VacancyState.vacancies)
  vacancies$: Observable<Vacancy[]>;

  ngOnInit(): void {
    this.store.dispatch(new LoadVacancies(0))
  }

  handleChangePage(page: number) {
    this.store.dispatch(new LoadVacancies(page));
  }
}
