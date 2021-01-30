import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import ShowRentsService from './ShowRentsService';
import FakeRentsRepository from '../typeorm/repositories/fake/FakeRentsRepository';

describe('ShowRents', () => {
  let rentsRepository: IRentsRepository;

  let showRents: ShowRentsService;

  beforeEach(() => {
    rentsRepository = new FakeRentsRepository();

    showRents = new ShowRentsService(rentsRepository);
  });

  it('should be able to show all rents', async () => {
    await rentsRepository.create({
      initial_date: new Date(),
      rent_status_id: 'fsadçj',
      return_date: new Date(),
      user_id: 'mjfdpusoaç',
      vehicle_id: 'fdsafd',
    });

    expect(await showRents.execute()).toHaveLength(1);
  });

  it('should not be able to show all rents if it does not have results', async () => {
    await expect(showRents.execute()).rejects.toBeInstanceOf(AppError);
  });
});
