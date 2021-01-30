import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import FakeVehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/fake/FakeVehiclesRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import { addMonths, addDays, addHours } from 'date-fns';
import IRentStatusRepository from '@modules/rents/dependencies/rentStatus/interfaces/IRentStatusRepository';
import FakeRentStatusRepository from '@modules/rents/dependencies/rentStatus/infra/typeorm/repositories/fake/FakeRentStatusRepository';
import UpdateRentService from './UpdateRentService';
import FakeRentsRepository from '../typeorm/repositories/fake/FakeRentsRepository';

describe('UpdateRent', () => {
  let rentsRepository: IRentsRepository;

  let vehiclesRepository: IVehiclesRepository;

  let rentStatusRepository: IRentStatusRepository;

  let updateRent: UpdateRentService;

  beforeEach(() => {
    rentsRepository = new FakeRentsRepository();

    vehiclesRepository = new FakeVehiclesRepository();

    rentStatusRepository = new FakeRentStatusRepository();

    updateRent = new UpdateRentService(rentsRepository, vehiclesRepository);
  });

  it('should be able to update a rent', async () => {
    const status = await rentStatusRepository.findByName('Pendente');
    if (status) {
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
      const rent = await rentsRepository.create({
        initial_date: initialDate,
        rent_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      expect(
        await updateRent.execute({
          id: rent.id,
          initial_date: rent.initial_date,
          rent_status_id: 'fdsajklç',
          return_date: rent.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).toMatchObject({
        id: rent.id,
        initial_date: rent.initial_date,
        rent_status_id: 'fdsajklç',
        return_date: rent.return_date,
      });
    }
  });

  it('should not be able to update a rent if it does not exist', async () => {
    await expect(
      updateRent.execute({
        id: 'fadsh',
        initial_date: new Date(),
        rent_status_id: 'jfdklaçsç',
        return_date: new Date(),
        renter_id: 'fajkfsadkçç',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a rent if the user does not have permission', async () => {
    const rent = await rentsRepository.create({
      initial_date: new Date(),
      rent_status_id: 'fsadçj',
      return_date: new Date(),
      renter_id: 'mjfdpusoaç',
      vehicle_id: 'fdsafd',
      lessor_id: 'oijfsdpa',
    });

    await expect(
      updateRent.execute({
        id: rent.id,
        initial_date: rent.initial_date,
        rent_status_id: 'fdsajklç',
        return_date: rent.return_date,
        renter_id: 'fasdgsag',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a rent if the status is not pendente', async () => {
    const status = await rentStatusRepository.findByName('Cancelado');
    if (status) {
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
      const rent = await rentsRepository.create({
        initial_date: initialDate,
        rent_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      await expect(
        updateRent.execute({
          id: rent.id,
          initial_date: rent.initial_date,
          rent_status_id: 'fdsajklç',
          return_date: rent.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rent if the initial date is in the past', async () => {
    const status = await rentStatusRepository.findByName('Pendente');
    if (status) {
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
      const rent = await rentsRepository.create({
        initial_date: initialDate,
        rent_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      await expect(
        updateRent.execute({
          id: rent.id,
          initial_date: new Date(2020, 0, 1),
          rent_status_id: 'fdsajklç',
          return_date: rent.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rent if the return date is earlier than initial date', async () => {
    const status = await rentStatusRepository.findByName('Pendente');
    if (status) {
      const vehicle = await vehiclesRepository.create({
        brand_id: 'fsdkauf',
        category_id: 'dfsuajçj',
        description: 'jfdipsufp',
        diary_value: 1,
        location_id: 'mfkdsjjj',
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
      const rent = await rentsRepository.create({
        initial_date: new Date(),
        rent_status_id: status.id,
        return_date: new Date(),
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      await expect(
        updateRent.execute({
          id: rent.id,
          initial_date: initialDate,
          rent_status_id: 'fdsajklç',
          return_date: returnDate,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rent if the vehicle does not exist', async () => {
    const status = await rentStatusRepository.findByName('Pendente');
    if (status) {
      const initialDate = addDays(new Date(), 24);

      const returnDate = addMonths(new Date(), 2);
      const rent = await rentsRepository.create({
        initial_date: initialDate,
        rent_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: 'fdsaafsad',
        lessor_id: 'difjsupa',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      await expect(
        updateRent.execute({
          id: rent.id,
          initial_date: rent.initial_date,
          rent_status_id: 'fdsajklç',
          return_date: rent.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rent if it does not respect the waiting time', async () => {
    const status = await rentStatusRepository.findByName('Pendente');
    if (status) {
      const vehicle = await vehiclesRepository.create({
        brand_id: 'fsdkaúf',
        category_id: 'd´fsuajçj',
        description: 'jfdipsufp',
        diary_value: 1,
        location_id: 'mfkdsjjj',
        model_id: 'jfuspdau',
        monthly_value: 1,
        name: 'fdsjajuç',
        user_id: 'mjfdpusoaç',
        weekly_value: 1,
        photo: 'fdsakm',
        waiting_time: 24,
      });
      const initialDate = addHours(new Date(), 4);

      const returnDate = addMonths(new Date(), 2);
      const rent = await rentsRepository.create({
        initial_date: initialDate,
        rent_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      await expect(
        updateRent.execute({
          id: rent.id,
          initial_date: rent.initial_date,
          rent_status_id: 'fdsajklç',
          return_date: rent.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rent if the new initial date is not available', async () => {
    const status = await rentStatusRepository.findByName('Pendente');
    if (status) {
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
      const initialDate = addDays(new Date(), 30);

      const returnDate = addDays(new Date(), 42);

      await rentsRepository.create({
        initial_date: addDays(new Date(), 28),
        rent_status_id: status.id,
        return_date: addDays(new Date(), 40),
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'fdsafasg',
      });
      const rent = await rentsRepository.create({
        initial_date: initialDate,
        rent_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      await expect(
        updateRent.execute({
          id: rent.id,
          initial_date: rent.initial_date,
          rent_status_id: 'fdsajklç',
          return_date: rent.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rent if the new return date is not available', async () => {
    const status = await rentStatusRepository.findByName('Pendente');
    if (status) {
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
      const initialDate = addDays(new Date(), 21);

      const returnDate = addDays(new Date(), 30);

      await rentsRepository.create({
        initial_date: addDays(new Date(), 28),
        rent_status_id: status.id,
        return_date: addDays(new Date(), 40),
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'fdsafasg',
      });
      const rent = await rentsRepository.create({
        initial_date: initialDate,
        rent_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rent.rent_status = status;

      await rentsRepository.update(rent);

      await expect(
        updateRent.execute({
          id: rent.id,
          initial_date: rent.initial_date,
          rent_status_id: 'fdsajklç',
          return_date: rent.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });
});
