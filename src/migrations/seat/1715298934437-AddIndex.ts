import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndex1715298934437 implements MigrationInterface {
    name = 'AddIndex1715298934437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "isBooked" ON "seat" ("isBooked") `);
        await queryRunner.query(`CREATE INDEX "concertDates" ON "seat" ("concertDatesId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."concertDates"`);
        await queryRunner.query(`DROP INDEX "public"."isBooked"`);
    }

}
