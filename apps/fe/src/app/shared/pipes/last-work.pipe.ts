import { Pipe, PipeTransform } from '@angular/core';
import { Experience } from '@meteora/api-interfaces';

@Pipe({
  name: 'lastWork'
})
export class LastWorkPipe implements PipeTransform {

  transform(experiences: Experience[]): string {
    if (!experiences || !Array.isArray(experiences)) {
      return '-'
    }
    const lastElem = experiences[experiences.length - 1];
    return typeof lastElem === 'string'
      ? lastElem
      : lastElem['position'] || '-';
  }

}
