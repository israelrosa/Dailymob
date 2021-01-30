import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import FakeVehiclesRepository from '../typeorm/repositories/fake/FakeVehiclesRepository';
import DeleteVehicleService from './DeleteVehicleService';

describe('DeleteVehicle', () => {
  let vehiclesRepository: IVehiclesRepository;

  let deleteVehicle: DeleteVehicleService;

  beforeEach(() => {
    vehiclesRepository = new FakeVehiclesRepository();

    deleteVehicle = new DeleteVehicleService(vehiclesRepository);
  });

  it('should be able to delete a vehicle', async () => {
    const vehicle = await vehiclesRepository.create({
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

    expect(await deleteVehicle.execute(vehicle.id, 'jpfdsua')).toBe(1);
  });

  it('should not be able to delete a vehicle if it does not exist', async () => {
    await expect(
      deleteVehicle.execute('ojfdspiau', 'jdfsjhfl'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a vehicle if it does not belong to the user', async () => {
    const vehicle = await vehiclesRepository.create({
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

    await expect(
      deleteVehicle.execute(vehicle.id, 'fadfdsagdsag'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
