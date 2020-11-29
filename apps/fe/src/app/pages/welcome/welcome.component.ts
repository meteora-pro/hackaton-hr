import { Component, OnInit } from '@angular/core';
import { Candidate, Vacancy } from '@meteora/api-interfaces';
import { Observable } from 'rxjs';
import { NestCrudService } from '../../shared/services/nest-crud.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
})
export class WelcomeComponent implements OnInit {
  constructor(private crudService: NestCrudService<any>) {}

  public candidates$: Observable<Candidate[]>;
  public vacancies$: Observable<Vacancy[]>;
  public candidatesLoading = true;
  public vacanciesLoading = true;

  ngOnInit() {
    this.loadCandidates();
  }

  private loadCandidates(): void {
    this.candidates$ = this.crudService
      .getEntities('candidate', { limit: 5, sort: {field: 'id', order: 'DESC'} })
      .pipe(tap(() => (this.candidatesLoading = false))) as Observable<Candidate[]>;


    this.vacancies$ = this.crudService
      .getEntities('vacancy', { limit: 5, sort: {field: 'id', order: 'DESC'} })
      .pipe(tap(() => (this.vacanciesLoading = false))) as Observable<Vacancy[]>;
  }
}
