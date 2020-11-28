import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  Candidate, Education, EducationLevelEnum, Experience, Language
} from '@meteora/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { SpecializationEntity } from './specialization.entity';
import { CommonService } from '../services/common/common.service';

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
  @Column()
  birthDate: Date;

  @ApiProperty({
    enum: CommonService.enumToArray(EducationLevelEnum),
    example: EducationLevelEnum.HIGHER,
  })
  @Column({ type: 'enum', enum: EducationLevelEnum })
  educationLevel: EducationLevelEnum;


  @ApiProperty()
  @Column('jsonb', { array: true, nullable: false, default: '{}' })
  educations: Education[];

  @ApiProperty()
  @Column('jsonb', { array: true, nullable: false, default: '{}' })
  experiences: Experience[];

  @ApiProperty()
  @Column()
  gender: "male" | "female";

  @ApiProperty()
  @Column('jsonb', { array: true, nullable: false, default: '{}' })
  languages: Language[];

  @ApiProperty()
  @Column()
  salary: number;

  @ApiProperty()
  @Column('text', { array: true, nullable: false, default: '{}' })
  skillSet: string[];

  @ApiProperty()
  @Column()
  skills: string;


  @ApiProperty()
  @ManyToMany(
    () => SpecializationEntity,
    (specialization) => specialization.candidates,
    { nullable: true, onDelete: 'SET NULL' }
  )
  @JoinTable()
  specialization: SpecializationEntity[];

  @ApiProperty()
  @Column()
  title: string;

}
