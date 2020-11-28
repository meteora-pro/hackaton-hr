import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'skills-frequency' })
export class SkillsFrequencyEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  normalizedName: string;

  @ApiProperty()
  @Column()
  originalName: string;

  @ApiProperty()
  @Column()
  frequency: number;

}
