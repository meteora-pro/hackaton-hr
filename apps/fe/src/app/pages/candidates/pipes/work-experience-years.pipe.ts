import { Pipe, PipeTransform } from '@angular/core';
import { Experience } from '@meteora/api-interfaces';

import formatDistanceStrict from 'date-fns/formatDistanceStrict';

@Pipe({
  name: 'workExperienceYears'
})
export class WorkExperienceYearsPipe implements PipeTransform {

  transform(experiences: Experience[]): number {
    const months = experiences.reduce((acc, item) => {
      const d = parseInt(
        formatDistanceStrict(new Date(item.start), new Date(item.end), {
          unit: 'month'
        }), 10
      );
      return acc + d;
    }, 0);
    return months;
  }
}
