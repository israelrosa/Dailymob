import IVehiclesRepository, {
  ICreateVehicle,
} from '@modules/vehicles/interfaces/IVehiclesRepository';
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
  }: ICreateVehicle): Promise<VehicleEntity> {
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
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<number | null | undefined> {
    const data = await this.ormRepository.delete(id);

    return data.affected;
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
