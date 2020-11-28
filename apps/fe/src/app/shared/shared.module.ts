import { NgModule } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { WorkExperienceYearsPipe } from './pipes/work-experience-years.pipe';
import { LastWorkPipe } from './pipes/last-work.pipe';
import { SalaryRangePipe } from './pipes/salary-range.pipe';
import { NeedExperiencePipe } from './pipes/need-experience.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WorkExperienceYearsPipe,
    LastWorkPipe,
    SalaryRangePipe,
    NeedExperiencePipe,
  ],
  exports: [
    WorkExperienceYearsPipe,
    LastWorkPipe,
    SalaryRangePipe,
    NeedExperiencePipe,
  ],
  providers: [
    I18nPluralPipe
  ]
})
export class SharedModule { }
