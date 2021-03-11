import FakeVehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/fake/FakeVehiclesRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import ICarsRepository from '../../interfaces/ICarsRepository';
import FakeCarsRepository from '../typeorm/repositories/fake/FakeCarsRepository';
import UpdateCarService from './UpdateCarService';

describe('UpdateCar', () => {
  let carsRepository: ICarsRepository;

  let vehiclesRepository: IVehiclesRepository;

  let updateCar: UpdateCarService;

  beforeEach(() => {
    carsRepository = new FakeCarsRepository();

    vehiclesRepository = new FakeVehiclesRepository();

    updateCar = new UpdateCarService(carsRepository, vehiclesRepository);
  });

  it('should be able to update a car', async () => {
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
      waiting_time: 8,
    });

    const car = await carsRepository.create({
      air_bag: true,
      air_conditioning: true,
      capacity: 4,
      doors: 4,
      max_speed: 120,
      vehicle_id: vehicle.id,
    });

    expect(
      await updateCar.execute({
        id: car.id,
        air_bag: true,
        air_conditioning: true,
        capacity: 4,
        doors: 3,
        max_speed: 180,
        user_id: 'jpfdsua',
      }),
    ).toMatchObject({
      id: car.id,
      air_bag: true,
      air_conditioning: true,
      capacity: 4,
      doors: 3,
      max_speed: 180,
    });
  });

  it('should not be able to update a car if it does not exist', async () => {
    await expect(
      updateCar.execute({
        id: 'fdsafsdfa',
        air_bag: true,
        air_conditioning: true,
        capacity: 4,
        doors: 4,
        max_speed: 120,
        user_id: 'jpfdsua',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a car if it does not belong to the user', async () => {
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
      waiting_time: 8,
    });

    const car = await carsRepository.create({
      air_bag: true,
      air_conditioning: true,
      capacity: 4,
      doors: 4,
      max_speed: 120,
      vehicle_id: vehicle.id,
    });

    await expect(
      updateCar.execute({
        id: car.id,
        air_bag: true,
        air_conditioning: true,
        capacity: 4,
        doors: 3,
        max_speed: 180,
        user_id: 'gfdshfddfs',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
