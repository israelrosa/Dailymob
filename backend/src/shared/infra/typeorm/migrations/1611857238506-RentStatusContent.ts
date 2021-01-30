import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RentStatusContent1611857238506
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const array = [
      'Pendente',
      'Negado',
      'Cancelado',
      'Confirmado',
      'Encerrado',
      'Em Atraso',
    ];

    array.forEach(async e => {
      await queryRunner.query(
        `INSERT INTO "rent_status" ("status") VALUES (${e})`,
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "rent_status"');
  }
}
