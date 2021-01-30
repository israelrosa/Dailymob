import { inject, injectable } from 'tsyringe';
import IModelsRepository from '../../interfaces/IModelsRepository';
import ModelEntity from '../typeorm/entities/ModelEntity';

@injectable()
export default class ValidateModelService {
  modelsRepository: IModelsRepository;

  constructor(@inject('ModelsRepository') modelsRepository: IModelsRepository) {
    this.modelsRepository = modelsRepository;
  }

  async execute(model: string, brand_id: string): Promise<ModelEntity> {
    const modelExist = await this.modelsRepository.findByName(model);

    if (!modelExist) {
      const newModel = await this.modelsRepository.create(model, brand_id);
      return newModel;
    }

    return modelExist;
  }
}
