import IRentalStatusRepository from '@modules/rentals/dependencies/rentalStatus/interfaces/IRentalStatusRepository';
import IRentalsRepository, {
  ICreateRental,
} from '@modules/rentals/interfaces/IRentalsRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import {
  differenceInHours,
  isAfter,
  isBefore,
  isEqual,
  isPast,
} from 'date-fns';
import { inject, injectable } from 'tsyringe';
import RentalEntity from '../typeorm/entities/RentalEntity';

@injectable()
export default class CreateRentalService {
  rentalsRepository: IRentalsRepository;

  vehiclesRepository: IVehiclesRepository;

  rentalStatusRepository: IRentalStatusRepository;

  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
    @inject('RentalStatusRepository')
    rentalStatusRepository: IRentalStatusRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
    this.vehiclesRepository = vehiclesRepository;
    this.rentalStatusRepository = rentalStatusRepository;
  }

  async execute({
    initial_date,
    return_date,
    renter_id,
    vehicle_id,
  }: ICreateRental): Promise<RentalEntity> {
    const vehicle = await this.vehiclesRepository.findById(vehicle_id);
    if (!vehicle) {
      throw new AppError('O veículo não existe.');
    }
    if (vehicle.user_id === renter_id) {
      throw new AppError('O usuário não pode alugar seus próprios veículos.');
    }

    const rental_status = await this.rentalStatusRepository.findByName(
      'Pendente',
    );

    if (!rental_status) {
      throw new AppError('O status não foi encontrado.');
    }

    if (isPast(initial_date)) {
      throw new AppError('A data inicial não pode ser anterior à data atual.');
    }

    if (isBefore(return_date, initial_date)) {
      throw new AppError(
        'A data de retorno não pode ser anterior à data inicial.',
      );
    }

    const time_interval = differenceInHours(initial_date, new Date());

    if (time_interval <= vehicle.waiting_time) {
      throw new AppError(
        `A data inicial deve ter o intervalo de ${vehicle.waiting_time}:00h em relação ao horário de agora.`,
      );
    }

    const rentals = await this.rentalsRepository.findByVehicleId(vehicle_id);

    rentals.forEach(rental => {
      if (
        (isAfter(initial_date, rental.initial_date) ||
          isEqual(initial_date, rental.initial_date)) &&
        (isBefore(initial_date, rental.return_date) ||
          isEqual(initial_date, rental.return_date))
      ) {
        throw new AppError(
          'A data inicial não está disponível, escolha outra. ',
        );
      } else if (
        (isAfter(return_date, rental.initial_date) ||
          isEqual(return_date, rental.initial_date)) &&
        (isBefore(return_date, rental.return_date) ||
          isEqual(return_date, rental.return_date))
      ) {
        throw new AppError(
          'A data de retorno não está disponível, ela deve respeitar o intervalo entre a sua data inicial e a data inicial do outro cliente. Escolha uma data anterior a que você escolheu.',
        );
      }
    });

    const data = await this.rentalsRepository.create({
      initial_date,
      rental_status_id: rental_status.id,
      return_date,
      renter_id,
      lessor_id: vehicle.user_id,
      vehicle_id,
    });

    return data;
  }
}
