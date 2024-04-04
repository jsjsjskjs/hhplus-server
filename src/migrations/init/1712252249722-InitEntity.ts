import { MigrationInterface, QueryRunner } from "typeorm";

export class InitEntity1712252249722 implements MigrationInterface {
    name = 'InitEntity1712252249722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."seat_grade_name_enum" AS ENUM('S', 'A', 'B', 'C')`);
        await queryRunner.query(`CREATE TABLE "seat_grade" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."seat_grade_name_enum" NOT NULL, "price" real NOT NULL, CONSTRAINT "PK_070b1ce617ce18ab5b6656cd669" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "concert" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artist" character varying NOT NULL, "venue" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_c96bfb33ee9a95525a3f5269d1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "point" real NOT NULL DEFAULT '0', CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "concert_dates" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "concertDate" TIMESTAMP NOT NULL, "reserveDate" TIMESTAMP NOT NULL, "concertId" uuid NOT NULL, CONSTRAINT "PK_fb131c2bc21206a4ce14bfbac9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seat" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "section" character varying NOT NULL, "row" character varying NOT NULL, "number" integer NOT NULL, "isBooked" boolean NOT NULL DEFAULT false, "seatGradeId" uuid NOT NULL, "concertDatesId" uuid NOT NULL, CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reservation_status_enum" AS ENUM('DONE', 'CANCEL')`);
        await queryRunner.query(`CREATE TABLE "reservation" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "status" "public"."reservation_status_enum" NOT NULL DEFAULT 'DONE', "clientId" uuid NOT NULL, "seatId" uuid NOT NULL, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."coin_log_eventtype_enum" AS ENUM('CHARGE', 'REDUCE', 'REFUND')`);
        await queryRunner.query(`CREATE TABLE "coin_log" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventType" "public"."coin_log_eventtype_enum" NOT NULL, "point" real NOT NULL DEFAULT '0', "clientId" uuid NOT NULL, "reservationId" uuid, CONSTRAINT "PK_be745435ff75320d016a42da0db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "concert_dates" ADD CONSTRAINT "FK_9026b4825af1f0f89b84f6f0655" FOREIGN KEY ("concertId") REFERENCES "concert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_a8626fd1fdd0bf36f360b713b87" FOREIGN KEY ("seatGradeId") REFERENCES "seat_grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_00b69c1501108954a85f094a1f9" FOREIGN KEY ("concertDatesId") REFERENCES "concert_dates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_cc7c746858c238288e45eedb9ac" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_70ef2f828ce6c1caa4646cf4801" FOREIGN KEY ("seatId") REFERENCES "seat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coin_log" ADD CONSTRAINT "FK_d6c1cb07fbe96c41c43bc834ba6" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coin_log" ADD CONSTRAINT "FK_671a3a128f909f6cfe489ee138d" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coin_log" DROP CONSTRAINT "FK_671a3a128f909f6cfe489ee138d"`);
        await queryRunner.query(`ALTER TABLE "coin_log" DROP CONSTRAINT "FK_d6c1cb07fbe96c41c43bc834ba6"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_70ef2f828ce6c1caa4646cf4801"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_cc7c746858c238288e45eedb9ac"`);
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_00b69c1501108954a85f094a1f9"`);
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_a8626fd1fdd0bf36f360b713b87"`);
        await queryRunner.query(`ALTER TABLE "concert_dates" DROP CONSTRAINT "FK_9026b4825af1f0f89b84f6f0655"`);
        await queryRunner.query(`DROP TABLE "coin_log"`);
        await queryRunner.query(`DROP TYPE "public"."coin_log_eventtype_enum"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_status_enum"`);
        await queryRunner.query(`DROP TABLE "seat"`);
        await queryRunner.query(`DROP TABLE "concert_dates"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "concert"`);
        await queryRunner.query(`DROP TABLE "seat_grade"`);
        await queryRunner.query(`DROP TYPE "public"."seat_grade_name_enum"`);
    }

}
