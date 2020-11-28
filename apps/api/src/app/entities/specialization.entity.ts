import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
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
  @ManyToMany(() => VacancyEntity, vacancy => vacancy.specialization, {nullable: true, persistence: true, onUpdate: "SET NULL", cascade: true})
  vacancies: VacancyEntity[];

  @ApiProperty({type: [VacancyEntity]})
  @ManyToMany(() => VacancyEntity, candidate => candidate.specialization, {nullable: true, persistence: true, onUpdate: "SET NULL", cascade: true})
  candidates: VacancyEntity[];

}
