import FakeRentStatusRepository from '@modules/rents/dependencies/rentStatus/infra/typeorm/repositories/fake/FakeRentStatusRepository';
import IRentStatusRepository from '@modules/rents/dependencies/rentStatus/interfaces/IRentStatusRepository';
import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import FakeRentsRepository from '../typeorm/repositories/fake/FakeRentsRepository';
import DeleteRentService from './DeleteRentService';

describe('DeleteRent', () => {
  let rentsRepository: IRentsRepository;

  let rentStatusRepository: IRentStatusRepository;

  let deleteRent: DeleteRentService;

  beforeEach(() => {
    rentsRepository = new FakeRentsRepository();

    rentStatusRepository = new FakeRentStatusRepository();

    deleteRent = new DeleteRentService(rentsRepository);
  });

  it('should be able to delete a rent', async () => {
    const status = await rentStatusRepository.findByName('Pendente');

    if (status) {
      const rent = await rentsRepository.create({
        initial_date: new Date(),
        rent_status_id: status.id,
        return_date: new Date(),
        renter_id: 'mjfdpusoaç',
        lessor_id: 'hjfdlsjahlk',
        vehicle_id: 'fdsafd',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      expect(await deleteRent.execute(rent.id, 'mjfdpusoaç')).toBe(1);
    }
  });

  it('should not be able to delete a rent if it does not exist', async () => {
    await expect(
      deleteRent.execute('jfd8suç', 'jfudsipp'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a rent if it does not belong to the user', async () => {
    const rent = await rentsRepository.create({
      initial_date: new Date(),
      rent_status_id: 'fsadçj',
      return_date: new Date(),
      renter_id: 'mjfdpusoaç',
      lessor_id: 'hjfdlsjahlk',
      vehicle_id: 'fdsafd',
    });

    await expect(
      deleteRent.execute(rent.id, 'gfsdgsasdf'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a rent if its status is not pendente', async () => {
    const status = await rentStatusRepository.findByName('Cancelado');

    if (status) {
      const rent = await rentsRepository.create({
        initial_date: new Date(),
        rent_status_id: status.id,
        return_date: new Date(),
        renter_id: 'mjfdpusoaç',
        lessor_id: 'hjfdlsjahlk',
        vehicle_id: 'fdsafd',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      await expect(
        deleteRent.execute(rent.id, 'mjfdpusoaç'),
      ).rejects.toBeInstanceOf(AppError);
    }
  });
});
