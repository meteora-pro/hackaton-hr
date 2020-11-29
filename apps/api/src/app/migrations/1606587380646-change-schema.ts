import {MigrationInterface, QueryRunner} from "typeorm";

export class changeSchema1606587380646 implements MigrationInterface {
    name = 'changeSchema1606587380646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE extension IF NOT EXISTS pg_trgm;
        CREATE INDEX trgm_candidates_title_idx ON candidates USING GIST(title gist_trgm_ops);
        CREATE INDEX trgm_vacancy_name_idx ON candidates USING GIST(title gist_trgm_ops);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
