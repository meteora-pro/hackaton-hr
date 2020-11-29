import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { VacancyPredictorService } from '../services/vacancy-predictor.service';
import { RequestSkillsDto } from '../dto/request-skills.dto';

@ApiTags('predictor')
@Controller('vacancy-predictor')
export class VacancyPredictorController {
  constructor(public service: VacancyPredictorService) {}

  @Get('vacancies-titles')
  getVacanciesTitles(@Query('key') key: string): Promise<string[]> {
    return this.service.getVacancyTitles(key);
  }


  @ApiBody({type: RequestSkillsDto})
  @Post('vacancies-skills')
  getVacanciesSkills(@Body() skillsBody: RequestSkillsDto): Promise<{ name: string, preset: boolean }[]> {
    return this.service.getSkillsMap(skillsBody.title, skillsBody.experience);
  }
}
