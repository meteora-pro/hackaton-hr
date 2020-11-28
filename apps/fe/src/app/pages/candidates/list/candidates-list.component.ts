import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Candidate } from '@meteora/api-interfaces';

@Component({
  selector: 'meteora-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.less']
})
export class CandidatesListComponent implements OnInit {

  constructor() { }

  @Select()
  candidates$: Observable<Candidate[]>;

  ngOnInit(): void {
  }

}
