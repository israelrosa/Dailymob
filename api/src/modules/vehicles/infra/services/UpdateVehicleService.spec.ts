import FakeBrandsRepository from '@modules/vehicles/dependencies/brands/infra/typeorm/repositories/fake/FakeBrandsRepository';
import IBrandsRepository from '@modules/vehicles/dependencies/brands/interfaces/IBrandsRepository';
import FakeModelsRepository from '@modules/vehicles/dependencies/models/infra/typeorm/repositories/fake/FakeModelsRepository';
import IModelsRepository from '@modules/vehicles/dependencies/models/interfaces/IModelsRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import FakeVehiclesRepository from '../typeorm/repositories/fake/FakeVehiclesRepository';
import UpdateVehicleService from './UpdateVehicleService';

describe('UpdateVehicle', () => {
  let vehiclesRepository: IVehiclesRepository;

  let brandsRepository: IBrandsRepository;

  let modelsRepository: IModelsRepository;

  let updateVehicle: UpdateVehicleService;

  beforeEach(() => {
    vehiclesRepository = new FakeVehiclesRepository();

    brandsRepository = new FakeBrandsRepository();

    modelsRepository = new FakeModelsRepository();

    updateVehicle = new UpdateVehicleService(
      vehiclesRepository,
      brandsRepository,
      modelsRepository,
    );
  });

  it('should be able to update a vehicle', async () => {
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
      waiting_time: 4,
    });

    expect(
      await updateVehicle.execute({
        id: vehicle.id,
        brand: 'jfdpshfaç',
        category_id: 'jfdsoau',
        description: 'fsdajpu',
        diary_value: 2,
        location_id: 'jfpiadsuioád',
        model: 'jfupdap',
        monthly_value: 4,
        name: 'fasdfdsafds',
        photo: 'afdafd',
        user_id: 'jpfdsua',
        weekly_value: 4,
        waiting_time: 4,
      }),
    ).toMatchObject({
      id: vehicle.id,
      category_id: 'jfdsoau',
      description: 'fsdajpu',
      diary_value: 2,
      location_id: 'jfpiadsuioád',
      monthly_value: 4,
      name: 'fasdfdsafds',
      photo: 'afdafd',
      user_id: 'jpfdsua',
      weekly_value: 4,
    });
  });

  it('should not be able to update a vehicle if it does not exist', async () => {
    await expect(
      updateVehicle.execute({
        id: 'fsdagdsfg',
        brand: 'jfdpshfaç',
        category_id: 'jfdsoau',
        description: 'fsdajpu',
        diary_value: 2,
        location_id: 'jfpiadsuioád',
        model: 'jfupdap',
        monthly_value: 4,
        name: 'fasdfdsafds',
        photo: 'afdafd',
        user_id: 'jpfdsua',
        weekly_value: 4,
        waiting_time: 3,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a vehicle if it does not belong to the user', async () => {
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
      waiting_time: 3,
    });

    await expect(
      updateVehicle.execute({
        id: vehicle.id,
        brand: 'jfdpshfaç',
        category_id: 'jfdsoau',
        description: 'fsdajpu',
        diary_value: 2,
        location_id: 'jfpiadsuioád',
        model: 'jfupdap',
        monthly_value: 4,
        name: 'fasdfdsafds',
        photo: 'afdafd',
        user_id: 'gsdfgsdfgasdg',
        weekly_value: 4,
        waiting_time: 4,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
