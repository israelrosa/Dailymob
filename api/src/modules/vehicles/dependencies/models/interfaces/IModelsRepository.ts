import ModelEntity from '../infra/typeorm/entities/ModelEntity';

export default interface IModelsRepository {
  findAll(): Promise<ModelEntity[]>;
  findById(id: string): Promise<ModelEntity | undefined>;
  create(name: string, brand_id: string): Promise<ModelEntity>;
  findByName(name: string): Promise<ModelEntity | undefined>;
}
