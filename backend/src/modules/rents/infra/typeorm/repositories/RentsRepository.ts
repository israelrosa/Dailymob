import IRentsRepository, {
  CreateRentRepository,
} from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import { getRepository, Repository } from 'typeorm';
import RentEntity from '../entities/RentEntity';

export default class RentsRepository implements IRentsRepository {
  ormRepository: Repository<RentEntity>;

  constructor() {
    this.ormRepository = getRepository(RentEntity);
  }

  async create({
    initial_date,
    rent_status_id,
    return_date,
    renter_id,
    vehicle_id,
    lessor_id,
  }: CreateRentRepository): Promise<RentEntity> {
    const data = await this.ormRepository.create({
      initial_date,
      rent_status_id,
      return_date,
      renter_id,
      vehicle_id,
      lessor_id,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<number> {
    const data = await this.ormRepository.delete(id);

    if (data.affected) {
      return data.affected;
    }

    throw new AppError('Não foi possível deletar o aluguel.');
  }

  async findAll(): Promise<RentEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<RentEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async update(rent: RentEntity): Promise<RentEntity> {
    const data = await this.ormRepository.save(rent);

    return data;
  }

  async findByVehicleId(vehicle_id: string): Promise<RentEntity[]> {
    const data = await this.ormRepository.find({ where: { vehicle_id } });

    return data;
  }
}
