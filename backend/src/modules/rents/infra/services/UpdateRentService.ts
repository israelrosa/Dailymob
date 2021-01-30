import 'reflect-metadata';
import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import {
  differenceInHours,
  isAfter,
  isBefore,
  isEqual,
  isPast,
} from 'date-fns';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import UpdateRentInput from '../controller/Inputs/UpdateRentInput';
import RentEntity from '../typeorm/entities/RentEntity';

interface IParams extends UpdateRentInput {
  renter_id: string;
}

@injectable()
export default class UpdateRentService {
  rentsRepository: IRentsRepository;

  vehiclesRepository: IVehiclesRepository;

  constructor(
    @inject('RentsRepository') rentsRepository: IRentsRepository,
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
  ) {
    this.rentsRepository = rentsRepository;
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute({
    id,
    initial_date,
    rent_status_id,
    return_date,
    renter_id,
  }: IParams): Promise<RentEntity> {
    const rent = await this.rentsRepository.findById(id);

    if (!rent) {
      throw new AppError('O aluguel não existe.');
    }

    if (rent.renter_id !== renter_id) {
      throw new AppError(
        'O usuário não tem permissão para atualizar o aluguel.',
        'UNAUTHORIZED',
      );
    }

    if (rent.rent_status.status !== 'Pendente') {
      throw new AppError(
        'Não é possível deletar um aluguel se ele não estiver com o status "pendente".',
      );
    }

    if (isPast(initial_date)) {
      throw new AppError('A data inicial não pode ser anterior à data atual.');
    }

    if (isBefore(return_date, initial_date)) {
      throw new AppError(
        'A data de retorno não pode ser anterior à data inicial.',
      );
    }

    const vehicle = await this.vehiclesRepository.findById(rent.vehicle_id);

    if (!vehicle) {
      throw new AppError(
        'O veículo não foi encontrado, verifique se ele não foi deletado.',
      );
    }
    const time_interval = differenceInHours(initial_date, new Date());

    if (time_interval <= vehicle.waiting_time) {
      throw new AppError(
        `A data inicial deve ter o intervalo de ${vehicle.waiting_time}:00h em relação ao horário de agora.`,
      );
    }

    const rents = await this.rentsRepository.findByVehicleId(vehicle.id);

    rents.forEach(rnt => {
      if (rnt.id !== id) {
        if (
          (isAfter(initial_date, rnt.initial_date) ||
            isEqual(initial_date, rnt.initial_date)) &&
          (isBefore(initial_date, rnt.return_date) ||
            isEqual(initial_date, rnt.return_date))
        ) {
          throw new AppError(
            'A data inicial não está disponível, escolha outra. ',
          );
        } else if (
          (isAfter(return_date, rnt.initial_date) ||
            isEqual(return_date, rnt.initial_date)) &&
          (isBefore(return_date, rnt.return_date) ||
            isEqual(return_date, rnt.return_date))
        ) {
          throw new AppError(
            'A data de retorno não está disponível, ela deve respeitar o intervalo entre a sua data inicial e a data inicial do outro cliente. Escolha uma data anterior a que você escolheu.',
          );
        }
      }
    });

    Object.assign(rent, {
      initial_date,
      rent_status_id,
      return_date,
    });

    const result = await this.rentsRepository.update(rent);

    return result;
  }
}
