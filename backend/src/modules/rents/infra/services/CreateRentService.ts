import IRentsRepository, {
  ICreateRent,
} from '@modules/rents/interfaces/IRentsRepository';
import { inject, injectable } from 'tsyringe';
import RentEntity from '../typeorm/entities/RentEntity';

@injectable()
export default class CreateRentService {
  rentsRepository: IRentsRepository;

  constructor(@inject('RentsRepository') rentsRepository: IRentsRepository) {
    this.rentsRepository = rentsRepository;
  }

  async execute({
    initial_date,
    pickup_location_id,
    rent_type_id,
    return_date,
    return_location_id,
    user_id,
    vehicle_id,
  }: ICreateRent): Promise<RentEntity> {
    const data = await this.rentsRepository.create({
      initial_date,
      pickup_location_id,
      rent_type_id,
      return_date,
      return_location_id,
      user_id,
      vehicle_id,
    });

    return data;
  }
}
