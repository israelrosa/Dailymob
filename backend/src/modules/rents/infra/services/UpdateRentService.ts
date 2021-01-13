import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import UpdateRentInput from '../controller/Inputs/UpdateRentInput';
import RentEntity from '../typeorm/entities/RentEntity';

interface IParams extends UpdateRentInput {
  user_id: string;
}

@injectable()
export default class UpdateRentService {
  rentsRepository: IRentsRepository;

  constructor(@inject('RentsRepository') rentsRepository: IRentsRepository) {
    this.rentsRepository = rentsRepository;
  }

  async execute({
    id,
    initial_date,
    pickup_location_id,
    rent_type_id,
    return_date,
    return_location_id,
    user_id,
    vehicle_id,
  }: IParams): Promise<RentEntity> {
    const rent = await this.rentsRepository.findById(id);

    if (!rent) {
      throw new AppError('O aluguel não existe.');
    }

    if (rent.user_id !== user_id) {
      throw new AppError(
        'O usuário não tem permissão para atualizar o aluguel.',
      );
    }

    Object.assign(rent, {
      initial_date,
      pickup_location_id,
      rent_type_id,
      return_date,
      return_location_id,
      vehicle_id,
    });

    const result = await this.rentsRepository.update(rent);

    return result;
  }
}
