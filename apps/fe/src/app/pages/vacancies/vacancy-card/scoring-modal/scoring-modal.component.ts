import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CandidateScoring } from '@meteora/api-interfaces';

@Component({
  selector: 'meteora-scoring-modal',
  templateUrl: './scoring-modal.component.html',
  styleUrls: ['./scoring-modal.component.less']
})
export class ScoringModalComponent implements OnInit {

  constructor(private modal: NzModalRef) { }

  @Input() scoring: CandidateScoring;

  ngOnInit(): void {
  }

}
