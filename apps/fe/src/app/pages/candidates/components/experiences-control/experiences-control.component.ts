import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Experience } from '@meteora/api-interfaces';

@Component({
  selector: 'experiences-control',
  templateUrl: './experiences-control.component.html',
  styleUrls: ['./experiences-control.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExperiencesControlComponent),
      multi: true
    }
  ]
})
export class ExperiencesControlComponent implements ControlValueAccessor {

  experiences: Experience[] = [];

  private onChange: (experiences: Experience[]) => {};
  private onTouched: () => {};

  registerOnChange(fn: (experiences: Experience[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: Experience[]): void {
    this.experiences = value || [];
    if (!this.experiences.length) {
      this.add();
    }
  }

  emitEvent() {
    this.onChange(this.experiences);
    this.experiences = [...this.experiences];
  }

  add() {
    this.experiences = [...this.experiences, {
      start: null,
      end: null,
      position: null,
      description: null,
    }];
  }
}
