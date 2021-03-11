import AppError from '@shared/error/AppError';
import FakeRentStatusRepository from '../typeorm/repositories/fake/FakeRentStatusRepository';
import ShowRentStatusService from './ShowRentStatusService';

describe('ShowRentStatus', () => {
  let rentStatusRepository: FakeRentStatusRepository;

  let showRentsStatus: ShowRentStatusService;

  beforeEach(() => {
    rentStatusRepository = new FakeRentStatusRepository();

    showRentsStatus = new ShowRentStatusService(rentStatusRepository);
  });

  it('should be able to show all rent status', async () => {
    expect(await showRentsStatus.execute()).toHaveLength(6);
  });

  it('should not be able to show all rent status if none exists', async () => {
    await rentStatusRepository.deleteAll();

    await expect(showRentsStatus.execute()).rejects.toBeInstanceOf(AppError);
  });
});
