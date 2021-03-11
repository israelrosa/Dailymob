import ICreateVehicleDTO from '@modules/vehicles/interfaces/ICreateVehicleDTO';
import IVehiclesRepository, {
  ICreateVehicle,
} from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import { getRepository, Repository } from 'typeorm';
import VehicleEntity from '../entities/VehicleEntity';

export default class VehiclesRepository implements IVehiclesRepository {
  ormRepository: Repository<VehicleEntity>;

  constructor() {
    this.ormRepository = getRepository(VehicleEntity);
  }

  async create({
    brand_id,
    category_id,
    description,
    diary_value,
    model_id,
    monthly_value,
    name,
    photo,
    weekly_value,
    user_id,
    location_id,
    waiting_time,
  }: ICreateVehicleDTO): Promise<VehicleEntity> {
    const data = await this.ormRepository.create({
      brand_id,
      category_id,
      description,
      diary_value,
      model_id,
      monthly_value,
      name,
      photo,
      weekly_value,
      user_id,
      location_id,
      waiting_time,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<number> {
    const data = await this.ormRepository.delete(id);
    if (data.affected) {
      return data.affected;
    }

    throw new AppError('Não foi possível deletar o veículo.');
  }

  async findAll(): Promise<VehicleEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<VehicleEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async update(vehicle: VehicleEntity): Promise<VehicleEntity> {
    const data = await this.ormRepository.save(vehicle);

    return data;
  }
}
