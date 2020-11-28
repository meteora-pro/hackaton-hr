import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryRange'
})
export class SalaryRangePipe implements PipeTransform {

  transform(value: {from: number, to: number}): string {
    const result = [value.from, value.to].filter(v => !!v).join(' - ');
    if (!result) {
      return 'Не указана';
    }
    return `${result} ₽`;
  }

}
