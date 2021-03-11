import IRentStatusRepository from '@modules/rents/dependencies/rentStatus/interfaces/IRentStatusRepository';
import IRentsRepository, {
  ICreateRent,
} from '@modules/rents/interfaces/IRentsRepository';
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
import RentEntity from '../typeorm/entities/RentEntity';

@injectable()
export default class CreateRentService {
  rentsRepository: IRentsRepository;

  vehiclesRepository: IVehiclesRepository;

  rentStatusRepository: IRentStatusRepository;

  constructor(
    @inject('RentsRepository') rentsRepository: IRentsRepository,
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
    @inject('RentStatusRepository') rentStatusRepository: IRentStatusRepository,
  ) {
    this.rentsRepository = rentsRepository;
    this.vehiclesRepository = vehiclesRepository;
    this.rentStatusRepository = rentStatusRepository;
  }

  async execute({
    initial_date,
    return_date,
    renter_id,
    vehicle_id,
  }: ICreateRent): Promise<RentEntity> {
    const vehicle = await this.vehiclesRepository.findById(vehicle_id);
    if (!vehicle) {
      throw new AppError('O veículo não existe.');
    }
    if (vehicle.user_id === renter_id) {
      throw new AppError('O usuário não pode alugar seus próprios veículos.');
    }

    const rent_status = await this.rentStatusRepository.findByName('Pendente');

    if (!rent_status) {
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

    const rents = await this.rentsRepository.findByVehicleId(vehicle_id);

    rents.forEach(rent => {
      if (
        (isAfter(initial_date, rent.initial_date) ||
          isEqual(initial_date, rent.initial_date)) &&
        (isBefore(initial_date, rent.return_date) ||
          isEqual(initial_date, rent.return_date))
      ) {
        throw new AppError(
          'A data inicial não está disponível, escolha outra. ',
        );
      } else if (
        (isAfter(return_date, rent.initial_date) ||
          isEqual(return_date, rent.initial_date)) &&
        (isBefore(return_date, rent.return_date) ||
          isEqual(return_date, rent.return_date))
      ) {
        throw new AppError(
          'A data de retorno não está disponível, ela deve respeitar o intervalo entre a sua data inicial e a data inicial do outro cliente. Escolha uma data anterior a que você escolheu.',
        );
      }
    });

    const data = await this.rentsRepository.create({
      initial_date,
      rent_status_id: rent_status.id,
      return_date,
      renter_id,
      lessor_id: vehicle.user_id,
      vehicle_id,
    });

    return data;
  }
}
