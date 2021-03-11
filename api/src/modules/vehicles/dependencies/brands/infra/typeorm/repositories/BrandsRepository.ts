import { getRepository, Repository } from 'typeorm';
import IBrandsRepository from '../../../interfaces/IBrandsRepository';
import BrandEntity from '../entities/BrandEntity';

export default class BrandsRepository implements IBrandsRepository {
  ormRepository: Repository<BrandEntity>;

  constructor() {
    this.ormRepository = getRepository(BrandEntity);
  }

  async findAll(): Promise<BrandEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<BrandEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async create(name: string, category_id: string): Promise<BrandEntity> {
    const data = await this.ormRepository.create({ name, category_id });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async findByName(name: string): Promise<BrandEntity | undefined> {
    const data = await this.ormRepository.findOne({ where: { name } });

    return data;
  }
}
