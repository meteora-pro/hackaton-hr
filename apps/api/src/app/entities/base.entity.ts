import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

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
