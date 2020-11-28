import { Pipe, PipeTransform } from '@angular/core';
import { Experience } from '@meteora/api-interfaces';

import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { I18nPluralPipe } from '@angular/common';

@Pipe({
  name: 'workExperienceYears'
})
export class WorkExperienceYearsPipe implements PipeTransform {

  constructor(private plural: I18nPluralPipe) {
  }

  transform(experiences: Experience[]): string {
    if (!experiences) {
      return 'Без опыта';
    }
    const monthCount = experiences
      .filter((item) => item.start && item.end)
      .reduce((acc, item) => {
        const d = parseInt(
          formatDistanceStrict(new Date(item.start), new Date(item.end), {
            unit: 'month'
          }), 10
        );
        return acc + d;
      }, 0);

    return this.humanizedMonths(monthCount);
  }

  private humanizedMonths(monthCount: number): string {
    const years = Math.floor(monthCount / 12);
    const months = Math.floor(monthCount % 12);
    const result = [
      this.plural.transform(years, {
        '=0': '',
        one: '# год',
        '=3': '# года',
        few: '# года',
        many: '# лет',
        other: '# года',
      }),
      this.plural.transform(months, {
        '=0': '',
        one: '# месяц',
        few: '# месяца',
        many: '# месяцев',
        other: '# месяца',
      }),
    ].filter(v => !!v);

    return result.length === 0
      ? 'Без опыта'
      : result.join(' ');
  }
}
