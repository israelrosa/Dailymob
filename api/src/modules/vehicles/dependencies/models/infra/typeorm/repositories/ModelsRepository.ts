import { getRepository, Repository } from 'typeorm';
import IModelsRepository from '../../../interfaces/IModelsRepository';
import ModelEntity from '../entities/ModelEntity';

export default class ModelsRepository implements IModelsRepository {
  ormRepository: Repository<ModelEntity>;

  constructor() {
    this.ormRepository = getRepository(ModelEntity);
  }

  async findAll(): Promise<ModelEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<ModelEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async create(name: string, brand_id: string): Promise<ModelEntity> {
    const data = await this.ormRepository.create({ name, brand_id });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async findByName(name: string): Promise<ModelEntity | undefined> {
    const data = await this.ormRepository.findOne({ where: { name } });

    return data;
  }
}
