import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'vacancies-predict' })
export class VacanciesPredictEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  originalName: string;

  @ApiProperty()
  @Column()
  normalizedName: string;

  @ApiProperty()
  @Column()
  experience: string;

  @ApiProperty()
  @Column('text', { array: true, nullable: true, default: '{}' })
  skills: string[];

}
