import { getRepository, Repository } from 'typeorm';
import IRentalStatusRepository from '../../../interfaces/IRentalStatusRepository';
import RentalStatusEntity from '../entities/RentalStatusEntity';

export default class RentalStatusRepository implements IRentalStatusRepository {
  ormRepository: Repository<RentalStatusEntity>;

  constructor() {
    this.ormRepository = getRepository(RentalStatusEntity);
  }

  async findAll(): Promise<RentalStatusEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<RentalStatusEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async findByName(name: string): Promise<RentalStatusEntity | undefined> {
    const data = await this.ormRepository.findOne({ where: { status: name } });

    return data;
  }
}
