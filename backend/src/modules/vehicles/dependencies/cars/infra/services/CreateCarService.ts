import { inject, injectable } from 'tsyringe';
import ICarsRepository, { ICreateCar } from '../../interfaces/ICarsRepository';
import CarsEntity from '../typeorm/entities/CarsEntity';

@injectable()
export default class CreateCarService {
  carsRepository: ICarsRepository;

  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({
    air_bag,
    air_conditioning,
    capacity,
    doors,
    max_speed,
    vehicle_id,
  }: ICreateCar): Promise<CarsEntity> {
    const data = await this.carsRepository.create({
      air_bag,
      air_conditioning,
      capacity,
      doors,
      max_speed,
      vehicle_id,
    });

    return data;
  }
}
