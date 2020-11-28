import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Specialization } from '@meteora/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { VacancyEntity } from './vacancy.entity';

@Entity({ name: 'specializations' })
export class SpecializationEntity extends BaseEntity implements Specialization {

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  profareaName: string;


  @ApiProperty({type: [VacancyEntity]})
  @OneToMany(() => VacancyEntity, vacancy => vacancy.specialization, {nullable: true, persistence: true, onUpdate: "SET NULL", cascade: true})
  vacancies: VacancyEntity[];

}
