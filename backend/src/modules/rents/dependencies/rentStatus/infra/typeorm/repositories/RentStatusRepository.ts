import { getRepository, Repository } from 'typeorm';
import IRentStatusRepository from '../../../interfaces/IRentStatusRepository';
import RentStatusEntity from '../entities/RentStatusEntity';

export default class RentStatusRepository implements IRentStatusRepository {
  ormRepository: Repository<RentStatusEntity>;

  constructor() {
    this.ormRepository = getRepository(RentStatusEntity);
  }

  async findAll(): Promise<RentStatusEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<RentStatusEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async findByName(name: string): Promise<RentStatusEntity | undefined> {
    const data = await this.ormRepository.findOne({ where: { status: name } });

    return data;
  }
}
