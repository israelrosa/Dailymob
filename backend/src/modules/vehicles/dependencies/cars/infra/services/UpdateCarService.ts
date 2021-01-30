import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import ICarsRepository from '../../interfaces/ICarsRepository';
import UpdateCarInput from '../controller/input/UpdateCarInput';
import CarsEntity from '../typeorm/entities/CarsEntity';

interface IParams extends UpdateCarInput {
  user_id: string;
}

@injectable()
export default class UpdateCarService {
  carsRepository: ICarsRepository;

  vehiclesRepository: IVehiclesRepository;

  constructor(
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
  ) {
    this.carsRepository = carsRepository;
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute({
    id,
    air_bag,
    air_conditioning,
    capacity,
    doors,
    max_speed,
    user_id,
  }: IParams): Promise<CarsEntity> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('O carro não existe.');
    }
    const vehicle = await this.vehiclesRepository.findById(car.vehicle_id);

    if (vehicle?.user_id !== user_id) {
      throw new AppError(
        'O usuário não tem permissão para atualizar o veículo.',
      );
    }

    Object.assign(car, {
      air_bag,
      air_conditioning,
      capacity,
      doors,
      max_speed,
    });

    const data = await this.carsRepository.update(car);
    return data;
  }
}
