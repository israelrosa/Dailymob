import AppError from '@shared/error/AppError';
import FakeRentalStatusRepository from '../typeorm/repositories/fake/FakeRentalStatusRepository';
import ShowRentalStatusService from './ShowRentalStatusService';

describe('ShowRentalStatus', () => {
  let rentalStatusRepository: FakeRentalStatusRepository;

  let showRentalsStatus: ShowRentalStatusService;

  beforeEach(() => {
    rentalStatusRepository = new FakeRentalStatusRepository();

    showRentalsStatus = new ShowRentalStatusService(rentalStatusRepository);
  });

  it('should be able to show all rental status', async () => {
    expect(await showRentalsStatus.execute()).toHaveLength(6);
  });

  it('should not be able to show all rental status if none exists', async () => {
    await rentalStatusRepository.deleteAll();

    await expect(showRentalsStatus.execute()).rejects.toBeInstanceOf(AppError);
  });
});
