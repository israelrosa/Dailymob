import { ICreateRent } from '@modules/rents/interfaces/IRentsRepository';
import { getRepository, Repository } from 'typeorm';
import RentEntity from '../entities/RentEntity';

export default class RentsRepository {
  ormRepository: Repository<RentEntity>;

  constructor() {
    this.ormRepository = getRepository(RentEntity);
  }

  async create({
    initial_date,
    pickup_location_id,
    rent_type_id,
    return_date,
    return_location_id,
    user_id,
    vehicle_id,
  }: ICreateRent): Promise<RentEntity> {
    const data = await this.ormRepository.create({
      initial_date,
      pickup_location_id,
      rent_type_id,
      return_date,
      return_location_id,
      user_id,
      vehicle_id,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<number | null | undefined> {
    const data = await this.ormRepository.delete(id);

    return data.affected;
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
}
