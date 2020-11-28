import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VacancyPredictorService } from '../services/vacancy-predictor.service';

@ApiTags('predictor')
@Controller('vacancy-predictor')
export class VacancyPredictorController {
  constructor(public service: VacancyPredictorService) {}

  @Get('vacancies-titles')
  get(@Query('key') key: string): Promise<string[]> {
    return this.service.getVacancyTitles(key);
  }
}
