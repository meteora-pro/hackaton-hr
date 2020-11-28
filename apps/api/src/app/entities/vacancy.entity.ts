import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  ExperienceEnum,
  ScheduleEnum,
  Vacancy,
} from '@meteora/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { CommonService } from '../services/common/common.service';
import { SpecializationEntity } from './specialization.entity';

@Entity({ name: 'vacancies' })
export class VacancyEntity extends BaseEntity implements Vacancy {
  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  areaName: string;

  @ApiProperty()
  @Column()
  closedAt: Date;


  @ApiProperty()
  @Column({nullable: true})
  vacancyNumber: string;

  @ApiProperty()
  @Column({ nullable: true})
  vacancyOwner: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({
    enum: CommonService.enumToArray(ExperienceEnum),
    example: ExperienceEnum.FROM_3_TO_5,
  })
  @Column({ type: 'enum', enum: ExperienceEnum })
  experience: ExperienceEnum;

  @ApiProperty()
  @Column()
  hasTest: boolean;

  @ApiProperty()
  @Column('text', { array: true, nullable: true, default: '{}' })
  keySkills: string[];

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  publishedAt: Date;

  @ApiProperty()
  @Column()
  responseLetterRequired: boolean;

  @ApiProperty()
  @Column()
  salaryFrom: number;

  @ApiProperty()
  @Column()
  salaryGross: boolean;

  @ApiProperty()
  @Column()
  salaryTo: number;

  @ApiProperty({
    enum: CommonService.enumToArray(ScheduleEnum),
    example: ScheduleEnum.FULL_DAY,
    default: ScheduleEnum.FULL_DAY,
  })
  @Column({ type: 'enum', enum: ScheduleEnum })
  schedule: ScheduleEnum;

  @ApiProperty()
  @ManyToMany(
    () => SpecializationEntity,
    (specialization) => specialization.vacancies,
    { nullable: true, onDelete: 'SET NULL' }
  )
  @JoinTable()
  specialization: SpecializationEntity[];

  @ApiProperty()
  @Column()
  testUrl: string;
}
