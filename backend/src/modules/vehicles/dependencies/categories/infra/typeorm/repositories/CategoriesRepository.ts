import { getRepository, Repository } from 'typeorm';
import ICategoriesRepository from '../../../interfaces/ICategoriesRepository';
import CategoryEntity from '../entities/CategoryEntity';

export default class CategoriesRepository implements ICategoriesRepository {
  ormRepository: Repository<CategoryEntity>;

  constructor() {
    this.ormRepository = getRepository(CategoryEntity);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<CategoryEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }
}
