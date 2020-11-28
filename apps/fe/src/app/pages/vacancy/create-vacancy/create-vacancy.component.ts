import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'meteora-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVacancyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
