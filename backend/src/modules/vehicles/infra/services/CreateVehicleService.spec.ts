import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import IBrandsRepository from '@modules/vehicles/dependencies/brands/interfaces/IBrandsRepository';
import IModelsRepository from '@modules/vehicles/dependencies/models/interfaces/IModelsRepository';
import FakeBrandsRepository from '@modules/vehicles/dependencies/brands/infra/typeorm/repositories/fake/FakeBrandsRepository';
import FakeModelsRepository from '@modules/vehicles/dependencies/models/infra/typeorm/repositories/fake/FakeModelsRepository';
import FakeVehiclesRepository from '../typeorm/repositories/fake/FakeVehiclesRepository';
import CreateVehicleService from './CreateVehicleService';
import FakeCategoriesRepository from '../../dependencies/categories/infra/typeorm/repositories/fake/FakeCategoriesRepository';

describe('CreateVehicleService', () => {
  let vehiclesRepository: IVehiclesRepository;

  let categoriesRepository: FakeCategoriesRepository;

  let brandsRepository: IBrandsRepository;

  let modelsRepository: IModelsRepository;

  let createVehicle: CreateVehicleService;

  beforeEach(() => {
    vehiclesRepository = new FakeVehiclesRepository();

    categoriesRepository = new FakeCategoriesRepository();

    brandsRepository = new FakeBrandsRepository();

    modelsRepository = new FakeModelsRepository();

    createVehicle = new CreateVehicleService(
      vehiclesRepository,
      categoriesRepository,
      brandsRepository,
      modelsRepository,
    );
  });

  it('should be able to create a vehicle', async () => {
    const category = await categoriesRepository.create('jfdpsajp');

    expect(
      await createVehicle.execute({
        brand: 'jfdpshfaç',
        category_id: category.id,
        description: 'fsdajpu',
        diary_value: 2,
        location_id: 'jfpiadsuioád',
        model: 'jfupdap',
        monthly_value: 4,
        name: 'jpfsdupu',
        photo: 'kjfpsdu',
        user_id: 'jpfdsua',
        weekly_value: 4,
        waiting_time: 10,
      }),
    ).toHaveProperty('id');
  });

  it('should not be able to create a vehicle if the category does not exist', async () => {
    await expect(
      createVehicle.execute({
        brand: 'jfdpshfaç',
        category_id: 'fdsafsdkjfkçlj',
        description: 'fsdajpu',
        diary_value: 2,
        location_id: 'jfpiadsuioád',
        model: 'jfupdap',
        monthly_value: 4,
        name: 'jpfsdupu',
        photo: 'kjfpsdu',
        user_id: 'jpfdsua',
        weekly_value: 4,
        waiting_time: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
