import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: Date, format: 'date-time'})
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: Date, format: 'date-time'})
  @UpdateDateColumn()
  updateAt: Date;

}
