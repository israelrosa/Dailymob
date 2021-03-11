import IRentalsRepository, {
  CreateRentalRepository,
} from '@modules/rentals/interfaces/IRentalsRepository';
import AppError from '@shared/error/AppError';
import { getRepository, Repository } from 'typeorm';
import RentalEntity from '../entities/RentalEntity';

export default class RentalsRepository implements IRentalsRepository {
  ormRepository: Repository<RentalEntity>;

  constructor() {
    this.ormRepository = getRepository(RentalEntity);
  }

  async create({
    initial_date,
    rental_status_id,
    return_date,
    renter_id,
    vehicle_id,
    lessor_id,
  }: CreateRentalRepository): Promise<RentalEntity> {
    const data = await this.ormRepository.create({
      initial_date,
      rental_status_id,
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

  async findAll(): Promise<RentalEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<RentalEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async update(rental: RentalEntity): Promise<RentalEntity> {
    const data = await this.ormRepository.save(rental);

    return data;
  }

  async findByVehicleId(vehicle_id: string): Promise<RentalEntity[]> {
    const data = await this.ormRepository.find({ where: { vehicle_id } });

    return data;
  }
}
