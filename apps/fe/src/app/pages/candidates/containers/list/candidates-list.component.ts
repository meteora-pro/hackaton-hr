import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Candidate } from '@meteora/api-interfaces';
import { LoadCandidates } from '../../store/candidates.actions';
import { CandidatesState } from '../../store/candidates.state';

@Component({
  selector: 'meteora-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesListComponent implements OnInit {

  constructor(private store: Store) { }

  @Select(CandidatesState.candidates)
  candidates$: Observable<Candidate[]>;

  ngOnInit(): void {
    this.store.dispatch(new LoadCandidates())
  }

}
