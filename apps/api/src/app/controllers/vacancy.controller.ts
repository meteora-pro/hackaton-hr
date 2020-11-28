import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { VacancyEntity } from '../entities/vacancy.entity';
import { VacancyService } from '../services/vacancy.service';

@ApiTags('vacancy')
@Crud({
  model: {
    type: VacancyEntity,
  },
})
@Controller('vacancy')
export class VacancyController implements CrudController<VacancyEntity> {
  constructor(public service: VacancyService) {}


  @Get('/:id/matched')
  async matchCandidates(): Promise<unknown> {
    return [{

    }];
  }
}
