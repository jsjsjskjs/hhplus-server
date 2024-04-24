import { MigrationInterface, QueryRunner } from "typeorm";

export class EditClient1712822077189 implements MigrationInterface {
    name = 'EditClient1712822077189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "password"`);
    }

}
