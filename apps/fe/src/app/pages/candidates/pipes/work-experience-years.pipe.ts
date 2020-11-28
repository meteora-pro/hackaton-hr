import { Pipe, PipeTransform } from '@angular/core';
import { Experience } from '@meteora/api-interfaces';

import formatDistanceStrict from 'date-fns/formatDistanceStrict';

@Pipe({
  name: 'workExperienceYears'
})
export class WorkExperienceYearsPipe implements PipeTransform {

  transform(experiences: Experience[]): number {
    return [...experiences].reduce((a, b) => {
      return a + formatDistanceStrict(b.start, b.end);
    }, 0);
  }

}
