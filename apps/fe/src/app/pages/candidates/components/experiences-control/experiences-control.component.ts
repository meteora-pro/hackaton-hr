import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

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
  }

  add() {
    this.experiences.push({
      start: null,
      end: null,
      position: null,
      description: null,
    });
    this.cdr.markForCheck();
  }
}
