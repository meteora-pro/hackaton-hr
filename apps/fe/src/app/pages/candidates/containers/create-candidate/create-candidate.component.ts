import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateCandidates } from '../../store/candidates.actions';
import { Candidate } from '@meteora/api-interfaces';

@Component({
  selector: 'meteora-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.less']
})
export class CreateCandidateComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  createCandidate(candidate: Candidate) {
    this.store.dispatch(new CreateCandidates(candidate));
  }
}
