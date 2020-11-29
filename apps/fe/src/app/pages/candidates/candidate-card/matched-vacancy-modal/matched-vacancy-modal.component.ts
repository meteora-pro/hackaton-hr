import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Scoring } from '@meteora/api-interfaces';

@Component({
  selector: 'meteora-matched-vacancy-modal',
  templateUrl: './matched-vacancy-modal.component.html',
  styleUrls: ['./matched-vacancy-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchedVacancyModalComponent {
  @Input()
  scoring: Scoring;

}
