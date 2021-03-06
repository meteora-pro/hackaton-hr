import { ExperienceEnum, ScheduleEnum, Specialization, Vacancy } from '@meteora/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CommonService } from '../services/common/common.service';
import { BaseEntity } from './base.entity';

@Entity({ name: 'vacancies' })
export class VacancyEntity extends BaseEntity implements Vacancy {
  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  @ApiProperty()
  @Column({ nullable: true })
  areaName: string;

  @ApiProperty()
  @Column({ nullable: true })
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
  @Column({ type: 'enum', enum: ExperienceEnum, nullable: true  })
  experience: ExperienceEnum;

  @ApiProperty()
  @Column({ nullable: true })
  hasTest: boolean;

  @ApiProperty()
  @Column('text', { array: true, nullable: true })
  keySkills: string[];

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({default: () => 'CURRENT_TIMESTAMP'})
  publishedAt: Date;

  @ApiProperty()
  @Column({default: true})
  responseLetterRequired: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  salaryFrom: number;

  @ApiProperty()
  @Column({ nullable: true })
  salaryGross: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  salaryTo: number;

  @ApiProperty({
    enum: CommonService.enumToArray(ScheduleEnum),
    example: ScheduleEnum.FULL_DAY,
    default: ScheduleEnum.FULL_DAY,
  })
  @Column({ type: 'enum', enum: ScheduleEnum, nullable: true })
  schedule: ScheduleEnum;

  @ApiProperty()
  @Column('jsonb', { default: '[]' })
  specialization: Specialization[];

  @ApiProperty()
  @Column({ nullable: true })
  testUrl: string;

  @ApiProperty()
  @Column({ default: true })
  isOwnVacancy: boolean; // Газпромбанка вакансия или нет

  @ApiProperty()
  @Column({ nullable: true })
  hhUrl: string;
}
