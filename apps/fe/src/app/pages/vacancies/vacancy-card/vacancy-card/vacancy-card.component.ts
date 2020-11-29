import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Vacancy } from '@meteora/api-interfaces';
import { LoadVacancyCard } from '../vacancy-card.actions';
import { VacancyCardState } from '../vacancy-card.state';

@Component({
  selector: 'meteora-vacancy-card',
  templateUrl: './vacancy-card.component.html',
  styleUrls: ['./vacancy-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyCardComponent implements OnInit, OnDestroy {

  constructor(private store: Store,
              private route: ActivatedRoute,
              ) { }

  @Select(VacancyCardState.vacancy)
  vacancy$: Observable<Vacancy>;
  isExpandedDescription = false;

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.store.dispatch(new LoadVacancyCard(params.id));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
