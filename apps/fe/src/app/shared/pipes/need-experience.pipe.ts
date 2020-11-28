import { Pipe, PipeTransform } from '@angular/core';
import { ExperienceEnum } from '@meteora/api-interfaces';

@Pipe({
  name: 'needExperience'
})
export class NeedExperiencePipe implements PipeTransform {

  transform(value: ExperienceEnum): unknown {
    return enumToString[value] || enumToString['UNKNOWN'];
  }
}

const enumToString = {
  NO_EXPERIENCE: 'Не требуется',
  FROM_0_TO_1: 'до года',
  FROM_1_TO_3: 'до 3 лет',
  FROM_3_TO_5: 'от 3 лет',
  FROM_5: 'от 5 лет',
  UNKNOWN: 'Не указано'
};
