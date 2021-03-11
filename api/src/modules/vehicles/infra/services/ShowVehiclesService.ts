import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import VehicleEntity from '../typeorm/entities/VehicleEntity';

@injectable()
export default class ShowVehiclesService {
  vehiclesRepository: IVehiclesRepository;

  constructor(
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
  ) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute(): Promise<VehicleEntity[]> {
    const data = await this.vehiclesRepository.findAll();

    if (data.length > 0) {
      return data;
    }

    throw new AppError('Não foram encontrados resultados.');
  }
}
