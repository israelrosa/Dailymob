import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import FakeVehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/fake/FakeVehiclesRepository';
import AppError from '@shared/error/AppError';
import FakeRentStatusRepository from '@modules/rents/dependencies/rentStatus/infra/typeorm/repositories/fake/FakeRentStatusRepository';
import { addDays, addHours, addMonths } from 'date-fns';
import CreateRentService from './CreateRentService';
import FakeRentsRepository from '../typeorm/repositories/fake/FakeRentsRepository';

describe('CreateRent', () => {
  let rentsRepository: IRentsRepository;

  let vehiclesRepository: IVehiclesRepository;

  let rentStatusRepository: FakeRentStatusRepository;

  let createRent: CreateRentService;

  beforeEach(() => {
    rentsRepository = new FakeRentsRepository();

    vehiclesRepository = new FakeVehiclesRepository();

    rentStatusRepository = new FakeRentStatusRepository();

    createRent = new CreateRentService(
      rentsRepository,
      vehiclesRepository,
      rentStatusRepository,
    );
  });

  it('should be able to create a rent', async () => {
    const vehicle = await vehiclesRepository.create({
      brand_id: 'fsdkaúf',
      category_id: 'd´fsuajçj',
      description: 'jfdipsufp',
      diary_value: 1,
      location_id: 'mfkdsj´j~j',
      model_id: 'jfuspdau',
      monthly_value: 1,
      name: 'fdsjajuç',
      user_id: 'mjfdpusoaç',
      weekly_value: 1,
      photo: 'fdsakm',
      waiting_time: 8,
    });

    const initialDate = addDays(new Date(), 24);

    const returnDate = addMonths(new Date(), 2);

    expect(
      await createRent.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).toHaveProperty('id');
  });

  it('should not be able to create a rent if the vehicle does not exist', async () => {
    const initialDate = addDays(new Date(), 24);

    const returnDate = addMonths(new Date(), 2);
    await expect(
      createRent.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: 'fdsafds',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent if the vehicle belong to the user', async () => {
    const vehicle = await vehiclesRepository.create({
      brand_id: 'fsdkaúf',
      category_id: 'd´fsuajçj',
      description: 'jfdipsufp',
      diary_value: 1,
      location_id: 'mfkdsj´j~j',
      model_id: 'jfuspdau',
      monthly_value: 1,
      name: 'fdsjajuç',
      user_id: 'mjfdpusoaç',
      weekly_value: 1,
      photo: 'fdsakm',
      waiting_time: 8,
    });

    const initialDate = addDays(new Date(), 24);

    const returnDate = addMonths(new Date(), 2);

    await expect(
      createRent.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent if the status does not exist', async () => {
    await rentStatusRepository.deleteAll();
    const vehicle = await vehiclesRepository.create({
      brand_id: 'fsdkaúf',
      category_id: 'd´fsuajçj',
      description: 'jfdipsufp',
      diary_value: 1,
      location_id: 'mfkdsj´j~j',
      model_id: 'jfuspdau',
      monthly_value: 1,
      name: 'fdsjajuç',
      user_id: 'mjfdpusoaç',
      weekly_value: 1,
      photo: 'fdsakm',
      waiting_time: 8,
    });

    const initialDate = addDays(new Date(), 24);

    const returnDate = addMonths(new Date(), 2);
    await expect(
      createRent.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent if the initial date is in the past', async () => {
    const vehicle = await vehiclesRepository.create({
      brand_id: 'fsdkaúf',
      category_id: 'd´fsuajçj',
      description: 'jfdipsufp',
      diary_value: 1,
      location_id: 'mfkdsj´j~j',
      model_id: 'jfuspdau',
      monthly_value: 1,
      name: 'fdsjajuç',
      user_id: 'mjfdpusoaç',
      weekly_value: 1,
      photo: 'fdsakm',
      waiting_time: 8,
    });

    const returnDate = addMonths(new Date(), 2);

    await expect(
      createRent.execute({
        initial_date: new Date(2020, 0, 1),
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent if the return date is earlier than initial date.', async () => {
    const vehicle = await vehiclesRepository.create({
      brand_id: 'fsdkaúf',
      category_id: 'd´fsuajçj',
      description: 'jfdipsufp',
      diary_value: 1,
      location_id: 'mfkdsj´j~j',
      model_id: 'jfuspdau',
      monthly_value: 1,
      name: 'fdsjajuç',
      user_id: 'mjfdpusoaç',
      weekly_value: 1,
      photo: 'fdsakm',
      waiting_time: 8,
    });

    const initialDate = addDays(new Date(), 24);

    const returnDate = addDays(new Date(), 2);

    await expect(
      createRent.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent if the initial date does not respect the waiting time', async () => {
    const vehicle = await vehiclesRepository.create({
      brand_id: 'fsdkaúf',
      category_id: 'd´fsuajçj',
      description: 'jfdipsufp',
      diary_value: 1,
      location_id: 'mfkdsj´j~j',
      model_id: 'jfuspdau',
      monthly_value: 1,
      name: 'fdsjajuç',
      user_id: 'mjfdpusoaç',
      weekly_value: 1,
      photo: 'fdsakm',
      waiting_time: 48,
    });

    const initialDate = addHours(new Date(), 24);

    const returnDate = addMonths(new Date(), 2);

    await expect(
      createRent.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent if the initial date is not available', async () => {
    const vehicle = await vehiclesRepository.create({
      brand_id: 'fsdkaúf',
      category_id: 'd´fsuajçj',
      description: 'jfdipsufp',
      diary_value: 1,
      location_id: 'mfkdsj´j~j',
      model_id: 'jfuspdau',
      monthly_value: 1,
      name: 'fdsjajuç',
      user_id: 'mjfdpusoaç',
      weekly_value: 1,
      photo: 'fdsakm',
      waiting_time: 8,
    });

    await rentsRepository.create({
      initial_date: addDays(new Date(), 26),
      rent_status_id: 'fksduflih',
      return_date: addMonths(new Date(), 3),
      renter_id: 'mjfdpusoaç',
      lessor_id: 'hjfdlsjahlk',
      vehicle_id: vehicle.id,
    });

    const initialDate = addDays(new Date(), 24);

    const returnDate = addMonths(new Date(), 2);

    await expect(
      createRent.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent if the return date is not available', async () => {
    const vehicle = await vehiclesRepository.create({
      brand_id: 'fsdkaúf',
      category_id: 'd´fsuajçj',
      description: 'jfdipsufp',
      diary_value: 1,
      location_id: 'mfkdsj´j~j',
      model_id: 'jfuspdau',
      monthly_value: 1,
      name: 'fdsjajuç',
      user_id: 'mjfdpusoaç',
      weekly_value: 1,
      photo: 'fdsakm',
      waiting_time: 8,
    });

    await rentsRepository.create({
      initial_date: addDays(new Date(), 1),
      rent_status_id: 'fksduflih',
      return_date: addDays(new Date(), 5),
      renter_id: 'mjfdpusoaç',
      lessor_id: 'hjfdlsjahlk',
      vehicle_id: vehicle.id,
    });

    const initialDate = addDays(new Date(), 2);

    const returnDate = addDays(new Date(), 6);

    await expect(
      createRent.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
