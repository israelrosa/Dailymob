import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import FakeVehiclesRepository from '../typeorm/repositories/fake/FakeVehiclesRepository';
import ShowVehiclesService from './ShowVehiclesService';

describe('ShowVehicles', () => {
  let vehiclesRepository: IVehiclesRepository;

  let showVehicles: ShowVehiclesService;

  beforeEach(() => {
    vehiclesRepository = new FakeVehiclesRepository();

    showVehicles = new ShowVehiclesService(vehiclesRepository);
  });

  it('should be able to show all vehicles', async () => {
    await vehiclesRepository.create({
      brand_id: 'jfdpshfaç',
      category_id: 'jfdsoau',
      description: 'fsdajpu',
      diary_value: 2,
      location_id: 'jfpiadsuioád',
      model_id: 'jfupdap',
      monthly_value: 4,
      name: 'jpfsdupu',
      photo: 'kjfpsdu',
      user_id: 'jpfdsua',
      weekly_value: 4,
    });

    expect(await showVehicles.execute()).toHaveLength(1);
  });

  it('should not be able to show all vehicles if it does not have results', async () => {
    await expect(showVehicles.execute()).rejects.toBeInstanceOf(AppError);
  });
});
