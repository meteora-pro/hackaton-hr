import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Candidate } from '@meteora/api-interfaces';
import { LoadCandidates } from '../store/candidates.actions';

@Component({
  selector: 'meteora-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.less']
})
export class CandidatesListComponent implements OnInit {

  constructor(private store: Store) { }

  @Select()
  candidates$: Observable<Candidate[]>;

  ngOnInit(): void {
    this.store.dispatch(new LoadCandidates())
  }

}
