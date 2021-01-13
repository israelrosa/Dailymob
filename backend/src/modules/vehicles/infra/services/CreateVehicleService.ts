import IVehiclesRepository, {
  ICreateVehicle,
} from '@modules/vehicles/interfaces/IVehiclesRepository';
import { inject, injectable } from 'tsyringe';
import VehicleEntity from '../typeorm/entities/VehicleEntity';

@injectable()
export default class CreateVehicleService {
  vehiclesRepository: IVehiclesRepository;

  constructor(
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
  ) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute({
    user_id,
    brand_id,
    category_id,
    description,
    diary_value,
    model_id,
    monthly_value,
    name,
    photo,
    weekly_value,
  }: ICreateVehicle): Promise<VehicleEntity> {
    const data = await this.vehiclesRepository.create({
      user_id,
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

    return data;
  }
}
