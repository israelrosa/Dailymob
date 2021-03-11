import IRentalsRepository from '@modules/rentals/interfaces/IRentalsRepository';
import AppError from '@shared/error/AppError';
import FakeVehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/fake/FakeVehiclesRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import { addMonths, addDays, addHours } from 'date-fns';
import IRentalStatusRepository from '@modules/rentals/dependencies/rentalStatus/interfaces/IRentalStatusRepository';
import FakeRentalStatusRepository from '@modules/rentals/dependencies/rentalStatus/infra/typeorm/repositories/fake/FakeRentalStatusRepository';
import UpdateRentalService from './UpdateRentalService';
import FakeRentalsRepository from '../typeorm/repositories/fake/FakeRentalsRepository';

describe('UpdateRental', () => {
  let rentalsRepository: IRentalsRepository;

  let vehiclesRepository: IVehiclesRepository;

  let rentalStatusRepository: IRentalStatusRepository;

  let updateRental: UpdateRentalService;

  beforeEach(() => {
    rentalsRepository = new FakeRentalsRepository();

    vehiclesRepository = new FakeVehiclesRepository();

    rentalStatusRepository = new FakeRentalStatusRepository();

    updateRental = new UpdateRentalService(
      rentalsRepository,
      vehiclesRepository,
    );
  });

  it('should be able to update a rental', async () => {
    const status = await rentalStatusRepository.findByName('Pendente');
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
      const rental = await rentalsRepository.create({
        initial_date: initialDate,
        rental_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      expect(
        await updateRental.execute({
          id: rental.id,
          initial_date: rental.initial_date,
          rental_status_id: 'fdsajklç',
          return_date: rental.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).toMatchObject({
        id: rental.id,
        initial_date: rental.initial_date,
        rental_status_id: 'fdsajklç',
        return_date: rental.return_date,
      });
    }
  });

  it('should not be able to update a rental if it does not exist', async () => {
    await expect(
      updateRental.execute({
        id: 'fadsh',
        initial_date: new Date(),
        rental_status_id: 'jfdklaçsç',
        return_date: new Date(),
        renter_id: 'fajkfsadkçç',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a rental if the user does not have permission', async () => {
    const rental = await rentalsRepository.create({
      initial_date: new Date(),
      rental_status_id: 'fsadçj',
      return_date: new Date(),
      renter_id: 'mjfdpusoaç',
      vehicle_id: 'fdsafd',
      lessor_id: 'oijfsdpa',
    });

    await expect(
      updateRental.execute({
        id: rental.id,
        initial_date: rental.initial_date,
        rental_status_id: 'fdsajklç',
        return_date: rental.return_date,
        renter_id: 'fasdgsag',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a rental if the status is not pendente', async () => {
    const status = await rentalStatusRepository.findByName('Cancelado');
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
      const rental = await rentalsRepository.create({
        initial_date: initialDate,
        rental_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      await expect(
        updateRental.execute({
          id: rental.id,
          initial_date: rental.initial_date,
          rental_status_id: 'fdsajklç',
          return_date: rental.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rental if the initial date is in the past', async () => {
    const status = await rentalStatusRepository.findByName('Pendente');
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
      const rental = await rentalsRepository.create({
        initial_date: initialDate,
        rental_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      await expect(
        updateRental.execute({
          id: rental.id,
          initial_date: new Date(2020, 0, 1),
          rental_status_id: 'fdsajklç',
          return_date: rental.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rental if the return date is earlier than initial date', async () => {
    const status = await rentalStatusRepository.findByName('Pendente');
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
      const rental = await rentalsRepository.create({
        initial_date: new Date(),
        rental_status_id: status.id,
        return_date: new Date(),
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      await expect(
        updateRental.execute({
          id: rental.id,
          initial_date: initialDate,
          rental_status_id: 'fdsajklç',
          return_date: returnDate,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rental if the vehicle does not exist', async () => {
    const status = await rentalStatusRepository.findByName('Pendente');
    if (status) {
      const initialDate = addDays(new Date(), 24);

      const returnDate = addMonths(new Date(), 2);
      const rental = await rentalsRepository.create({
        initial_date: initialDate,
        rental_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: 'fdsaafsad',
        lessor_id: 'difjsupa',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      await expect(
        updateRental.execute({
          id: rental.id,
          initial_date: rental.initial_date,
          rental_status_id: 'fdsajklç',
          return_date: rental.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rental if it does not respect the waiting time', async () => {
    const status = await rentalStatusRepository.findByName('Pendente');
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
      const rental = await rentalsRepository.create({
        initial_date: initialDate,
        rental_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      await expect(
        updateRental.execute({
          id: rental.id,
          initial_date: rental.initial_date,
          rental_status_id: 'fdsajklç',
          return_date: rental.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rental if the new initial date is not available', async () => {
    const status = await rentalStatusRepository.findByName('Pendente');
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

      await rentalsRepository.create({
        initial_date: addDays(new Date(), 28),
        rental_status_id: status.id,
        return_date: addDays(new Date(), 40),
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'fdsafasg',
      });
      const rental = await rentalsRepository.create({
        initial_date: initialDate,
        rental_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      await expect(
        updateRental.execute({
          id: rental.id,
          initial_date: rental.initial_date,
          rental_status_id: 'fdsajklç',
          return_date: rental.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });

  it('should not be able to update a rental if the new return date is not available', async () => {
    const status = await rentalStatusRepository.findByName('Pendente');
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

      await rentalsRepository.create({
        initial_date: addDays(new Date(), 28),
        rental_status_id: status.id,
        return_date: addDays(new Date(), 40),
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'fdsafasg',
      });
      const rental = await rentalsRepository.create({
        initial_date: initialDate,
        rental_status_id: status.id,
        return_date: returnDate,
        renter_id: 'mjfdpusoaç',
        vehicle_id: vehicle.id,
        lessor_id: 'difjsupa',
      });

      rental.rental_status = status;

      await rentalsRepository.update(rental);

      await expect(
        updateRental.execute({
          id: rental.id,
          initial_date: rental.initial_date,
          rental_status_id: 'fdsajklç',
          return_date: rental.return_date,
          renter_id: 'mjfdpusoaç',
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  });
});
