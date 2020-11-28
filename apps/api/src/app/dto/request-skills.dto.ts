import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ExperienceEnum } from '@meteora/api-interfaces';
import { CommonService } from '../services/common/common.service';

export class RequestSkillsDto {

  @ApiModelProperty({example: 'Frontend разработчик'})
  title: string;

  @ApiModelProperty({enum: CommonService.enumToArray(ExperienceEnum), example: ExperienceEnum.FROM_1_TO_3})
  experience: ExperienceEnum;
}
