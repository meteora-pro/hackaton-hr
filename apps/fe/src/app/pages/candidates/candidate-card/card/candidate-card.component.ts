import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApproveCandidate, LoadCandidateById, RejectCandidate } from '../candidate-card.actions';
import { CandidateCardState } from '../candidate-card.state';
import { Candidate } from '@meteora/api-interfaces';

@Component({
  selector: 'meteora-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateCardComponent implements OnInit, OnDestroy {

  constructor(private store: Store,
              private route: ActivatedRoute,
  ) { }

  @Select(CandidateCardState.candidate)
  candidate$: Observable<Candidate>;

  isVisibleRejectModal = false;
  isVisibleApproveModal = false;

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.store.dispatch(new LoadCandidateById(params.id));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleRejectCandidate() {
    this.isVisibleRejectModal = false;
    this.store.dispatch(new RejectCandidate());
  }

  handleApproveCandidate() {
    this.isVisibleApproveModal = false;
    this.store.dispatch(new ApproveCandidate());
  }

  handleCancel() {
    this.isVisibleRejectModal = false;
    this.isVisibleApproveModal = false;
  }
}
