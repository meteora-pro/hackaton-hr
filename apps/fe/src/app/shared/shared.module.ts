import { NgModule } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { WorkExperienceYearsPipe } from './pipes/work-experience-years.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WorkExperienceYearsPipe,
  ],
  exports: [
    WorkExperienceYearsPipe,
  ],
  providers: [
    I18nPluralPipe
  ]
})
export class SharedModule { }
