import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CategoriesContent1611856751125
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const array = ['Carros', 'Motos', 'Bikes'];
    array.forEach(e => {
      queryRunner.query(`INSERT INTO "categories" ("name") VALUES (${e})`);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DELETE FROM "categories"');
  }
}
