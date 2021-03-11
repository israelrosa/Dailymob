import IRentalsRepository from '@modules/rentals/interfaces/IRentalsRepository';
import AppError from '@shared/error/AppError';
import ShowRentalsService from './ShowRentalsService';
import FakeRentalsRepository from '../typeorm/repositories/fake/FakeRentalsRepository';

describe('ShowRentals', () => {
  let rentalsRepository: IRentalsRepository;

  let showRentals: ShowRentalsService;

  beforeEach(() => {
    rentalsRepository = new FakeRentalsRepository();

    showRentals = new ShowRentalsService(rentalsRepository);
  });

  it('should be able to show all rentals', async () => {
    await rentalsRepository.create({
      initial_date: new Date(),
      rental_status_id: 'fsadçj',
      return_date: new Date(),
      renter_id: 'jfdpas',
      lessor_id: 'mjfdpusoaç',
      vehicle_id: 'fdsafd',
    });

    expect(await showRentals.execute()).toHaveLength(1);
  });

  it('should not be able to show all rentals if it does not have results', async () => {
    await expect(showRentals.execute()).rejects.toBeInstanceOf(AppError);
  });
});
