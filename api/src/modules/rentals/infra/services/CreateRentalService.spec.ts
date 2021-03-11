import IRentalsRepository from '@modules/rentals/interfaces/IRentalsRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import FakeVehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/fake/FakeVehiclesRepository';
import AppError from '@shared/error/AppError';
import FakeRentalStatusRepository from '@modules/rentals/dependencies/rentalStatus/infra/typeorm/repositories/fake/FakeRentalStatusRepository';
import { addDays, addHours, addMonths } from 'date-fns';
import CreateRentalService from './CreateRentalService';
import FakeRentalsRepository from '../typeorm/repositories/fake/FakeRentalsRepository';

describe('CreateRental', () => {
  let rentalsRepository: IRentalsRepository;

  let vehiclesRepository: IVehiclesRepository;

  let rentalStatusRepository: FakeRentalStatusRepository;

  let createRental: CreateRentalService;

  beforeEach(() => {
    rentalsRepository = new FakeRentalsRepository();

    vehiclesRepository = new FakeVehiclesRepository();

    rentalStatusRepository = new FakeRentalStatusRepository();

    createRental = new CreateRentalService(
      rentalsRepository,
      vehiclesRepository,
      rentalStatusRepository,
    );
  });

  it('should be able to create a rental', async () => {
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
      await createRental.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).toHaveProperty('id');
  });

  it('should not be able to create a rental if the vehicle does not exist', async () => {
    const initialDate = addDays(new Date(), 24);

    const returnDate = addMonths(new Date(), 2);
    await expect(
      createRental.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: 'fdsafds',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if the vehicle belong to the user', async () => {
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
      createRental.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if the status does not exist', async () => {
    await rentalStatusRepository.deleteAll();
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
      createRental.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if the initial date is in the past', async () => {
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
      createRental.execute({
        initial_date: new Date(2020, 0, 1),
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if the return date is earlier than initial date.', async () => {
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
      createRental.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if the initial date does not respect the waiting time', async () => {
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
      createRental.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if the initial date is not available', async () => {
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

    await rentalsRepository.create({
      initial_date: addDays(new Date(), 26),
      rental_status_id: 'fksduflih',
      return_date: addMonths(new Date(), 3),
      renter_id: 'mjfdpusoaç',
      lessor_id: 'hjfdlsjahlk',
      vehicle_id: vehicle.id,
    });

    const initialDate = addDays(new Date(), 24);

    const returnDate = addMonths(new Date(), 2);

    await expect(
      createRental.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if the return date is not available', async () => {
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

    await rentalsRepository.create({
      initial_date: addDays(new Date(), 1),
      rental_status_id: 'fksduflih',
      return_date: addDays(new Date(), 5),
      renter_id: 'mjfdpusoaç',
      lessor_id: 'hjfdlsjahlk',
      vehicle_id: vehicle.id,
    });

    const initialDate = addDays(new Date(), 2);

    const returnDate = addDays(new Date(), 6);

    await expect(
      createRental.execute({
        initial_date: initialDate,
        return_date: returnDate,
        renter_id: 'fdjsaç',
        vehicle_id: vehicle.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
