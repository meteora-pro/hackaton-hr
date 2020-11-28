import { NgModule } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { WorkExperienceYearsPipe } from './pipes/work-experience-years.pipe';
import { LastWorkPipe } from './pipes/last-work.pipe';
import { SalaryRangePipe } from './pipes/salary-range.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WorkExperienceYearsPipe,
    LastWorkPipe,
    SalaryRangePipe,
  ],
  exports: [
    WorkExperienceYearsPipe,
    LastWorkPipe,
    SalaryRangePipe,
  ],
  providers: [
    I18nPluralPipe
  ]
})
export class SharedModule { }
