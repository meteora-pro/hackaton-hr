import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryRange'
})
export class SalaryRangePipe implements PipeTransform {

  transform(value: {from: number, to: number}): string {
    switch (true) {
      case !!value.from && !!value.to:
        return `${value.from} - ${value.to} ₽`;
      case !!value.from:
        return `от ${value.from} ₽`;
      case !!value.to:
        return `до ${value.to} ₽`;
      default:
        return 'Не указана'
    }
  }

}
