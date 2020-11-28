import { Pipe, PipeTransform } from '@angular/core';
import { Experience } from '@meteora/api-interfaces';

import formatDistance from 'date-fns/formatDistance';

@Pipe({
  name: 'workExperienceYears'
})
export class WorkExperienceYearsPipe implements PipeTransform {

  transform(experiences: Experience[]): number {
    return experiences.reduce((acc, item) => {
      const d = parseFloat(formatDistance(item.start, item.end, {
        addSuffix: false,
      }));
      return acc + d;
    }, 0);
  }
}
