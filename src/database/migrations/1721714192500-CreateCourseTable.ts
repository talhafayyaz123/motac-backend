import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseTable1721714192500 implements MigrationInterface {
  name = 'CreateCourseTable1721714192500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course" ("description" character varying NOT NULL, "fee" integer NOT NULL, "name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "course"`);
  }
}
