import IModelsRepository from '@modules/vehicles/dependencies/models/interfaces/IModelsRepository';
import { v4 as uuid } from 'uuid';
import ModelEntity from '../../entities/ModelEntity';

export default class FakeModelsRepository implements IModelsRepository {
  models: ModelEntity[] = [];

  async findAll(): Promise<ModelEntity[]> {
    return this.models;
  }

  async findById(id: string): Promise<ModelEntity | undefined> {
    const data = this.models.find(model => model.id === id);

    return data;
  }

  async create(name: string, brand_id: string): Promise<ModelEntity> {
    const model = new ModelEntity();

    Object.assign(model, {
      id: uuid(),
      name,
      brand_id,
    });

    this.models.push(model);

    return model;
  }

  async findByName(name: string): Promise<ModelEntity | undefined> {
    const data = this.models.find(model => model.name === name);

    return data;
  }
}
