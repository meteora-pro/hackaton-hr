import {MigrationInterface, QueryRunner} from "typeorm";

export class changeSchema1606587380646 implements MigrationInterface {
    name = 'changeSchema1606587380646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE extension IF NOT EXISTS pg_trgm;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
