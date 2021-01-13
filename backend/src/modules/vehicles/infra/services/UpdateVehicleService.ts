import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import UpdateVehicleInput from '../controller/inputs/UpdateVehicleInput';
import VehicleEntity from '../typeorm/entities/VehicleEntity';

interface IParams extends UpdateVehicleInput {
  user_id: string;
}

@injectable()
export default class UpdateVehicleService {
  vehiclesRepository: IVehiclesRepository;

  constructor(
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
  ) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute({
    id,
    brand_id,
    category_id,
    description,
    diary_value,
    model_id,
    monthly_value,
    name,
    photo,
    user_id,
    weekly_value,
  }: IParams): Promise<VehicleEntity> {
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      throw new AppError('O veículo não existe');
    }

    if (vehicle.user_id !== user_id) {
      throw new AppError(
        'O usuário não tem permissão para atualizar um veículo que não o pertence.',
      );
    }

    Object.assign(vehicle, {
      brand_id,
      category_id,
      description,
      diary_value,
      model_id,
      monthly_value,
      name,
      photo,
      weekly_value,
    });

    const data = await this.vehiclesRepository.update(vehicle);

    return data;
  }
}
