import { Logger } from '@nestjs/common';
import {MigrationInterface, QueryRunner} from "typeorm";
import * as rawResumesDataSet from '../../assets/predict-sources/resumes.json';
import { CandidateEntity } from '../entities/candidate.entity';
import { DataTransformer } from '../services/data-transformer';
import { MigrationSlicer } from '../services/migration-slicer';
export class importExistData1606574429753 implements MigrationInterface {
  name = 'importExistData1606574429753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const normalizedCandidate = DataTransformer.normalizeResumes(rawResumesDataSet);

    const resumeRepository = queryRunner.connection.getRepository(
      CandidateEntity,
    );
    const chunks =  MigrationSlicer.sliceData(normalizedCandidate, 25);
    for ( const [index, chunk] of chunks.entries() ) {
      Logger.log(`Load ${index} of ${chunks.length} resume chunk`);
      await resumeRepository.insert(chunk);
    }

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
