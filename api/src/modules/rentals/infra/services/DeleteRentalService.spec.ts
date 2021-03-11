import FakeRentalStatusRepository from '@modules/rentals/dependencies/rentalStatus/infra/typeorm/repositories/fake/FakeRentalStatusRepository';
import IRentalStatusRepository from '@modules/rentals/dependencies/rentalStatus/interfaces/IRentalStatusRepository';
import IRentalsRepository from '@modules/rentals/interfaces/IRentalsRepository';
import AppError from '@shared/error/AppError';
import FakeRentalsRepository from '../typeorm/repositories/fake/FakeRentalsRepository';
import DeleteRentalService from './DeleteRentalService';

describe('DeleteRental', () => {
  let rentalsRepository: IRentalsRepository;

  let rentalStatusRepository: IRentalStatusRepository;

  let deleteRental: DeleteRentalService;

  beforeEach(() => {
    rentalsRepository = new FakeRentalsRepository();

    rentalStatusRepository = new FakeRentalStatusRepository();

    deleteRental = new DeleteRentalService(rentalsRepository);
  });

  it('should be able to delete a rental', async () => {
    const status = await rentalStatusRepository.findByName('Pendente');

    if (status) {
      const rental = await rentalsRepository.create({
        initial_date: new Date(),
        rental_status_id: status.id,
        return_date: new Date(),
        renter_id: 'mjfdpusoaç',
        lessor_id: 'hjfdlsjahlk',
        vehicle_id: 'fdsafd',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      expect(await deleteRental.execute(rental.id, 'mjfdpusoaç')).toBe(1);
    }
  });

  it('should not be able to delete a rental if it does not exist', async () => {
    await expect(
      deleteRental.execute('jfd8suç', 'jfudsipp'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a rental if it does not belong to the user', async () => {
    const rental = await rentalsRepository.create({
      initial_date: new Date(),
      rental_status_id: 'fsadçj',
      return_date: new Date(),
      renter_id: 'mjfdpusoaç',
      lessor_id: 'hjfdlsjahlk',
      vehicle_id: 'fdsafd',
    });

    await expect(
      deleteRental.execute(rental.id, 'gfsdgsasdf'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a rental if its status is not pendente', async () => {
    const status = await rentalStatusRepository.findByName('Cancelado');

    if (status) {
      const rental = await rentalsRepository.create({
        initial_date: new Date(),
        rental_status_id: status.id,
        return_date: new Date(),
        renter_id: 'mjfdpusoaç',
        lessor_id: 'hjfdlsjahlk',
        vehicle_id: 'fdsafd',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      await expect(
        deleteRental.execute(rental.id, 'mjfdpusoaç'),
      ).rejects.toBeInstanceOf(AppError);
    }
  });
});
