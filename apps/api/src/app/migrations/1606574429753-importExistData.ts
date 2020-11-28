import {MigrationInterface, QueryRunner} from "typeorm";
import * as rawResumesDataSet from '../../assets/predict-sources/resumes.json';
import { CandidateEntity } from '../entities/candidate.entity';
import { DataTransformer } from '../services/data-transformer';
export class importExistData1606574429753 implements MigrationInterface {
  name = 'importExistData1606574429753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const normalizedCandidate = DataTransformer.normalizeResumes(rawResumesDataSet);

    const resumeRepository = queryRunner.connection.getRepository(
      CandidateEntity,
    );
    await resumeRepository.insert(normalizedCandidate);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
