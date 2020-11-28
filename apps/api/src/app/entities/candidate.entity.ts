import {
  Candidate,
  Education,
  EducationLevelEnum,
  Experience,
  Language,
  Specialization,
} from '@meteora/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CommonService } from '../services/common/common.service';
import { BaseEntity } from './base.entity';

@Entity({ name: 'candidates' })
export class CandidateEntity extends BaseEntity implements Candidate {

  @ApiProperty()
  @Column()
  fullName: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  about: string;

  @ApiProperty()
  @Column()
  area: string;

  @ApiProperty()
  @Column({ nullable: true })
  birthDate: Date;

  @ApiProperty({
    enum: CommonService.enumToArray(EducationLevelEnum),
    example: EducationLevelEnum.HIGHER,
  })
  @Column({ type: 'enum', enum: EducationLevelEnum, nullable: true })
  educationLevel: EducationLevelEnum;

  @ApiProperty()
  @Column('jsonb', { nullable: false, default: '{}' })
  educations: Education[];

  @ApiProperty()
  @Column('jsonb', { nullable: false, default: '{}' })
  experiences: Experience[];

  @ApiProperty()
  @Column()
  gender: "male" | "female" | "unknown";

  @ApiProperty()
  @Column('jsonb', { nullable: false, default: '{}' })
  languages: Language[];

  @ApiProperty()
  @Column({nullable: true})
  salary: number;

  @ApiProperty()
  @Column('text', { array: true, nullable: false, default: '{}' })
  skillSet: string[];

  @ApiProperty()
  @Column({nullable: true})
  skills: string;

  @ApiProperty()
  @Column('jsonb', { default: '[]' })
  specialization: Specialization[];

  @ApiProperty()
  @Column()
  title: string;

}
