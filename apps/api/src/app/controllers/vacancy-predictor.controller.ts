import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { VacancyEntity } from '../entities/vacancy.entity';
import { VacancyService } from '../services/vacancy.service';
import { VacancyPredictorService } from '../services/vacancy-predictor.service';

@ApiTags('predictor')

@Controller('vacancy-predictor')
export class VacancyController {
  constructor(public service: VacancyPredictorService) {}
}
