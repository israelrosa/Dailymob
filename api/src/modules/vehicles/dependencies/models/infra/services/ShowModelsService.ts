import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IModelsRepository from '../../interfaces/IModelsRepository';
import ModelEntity from '../typeorm/entities/ModelEntity';

@injectable()
export default class ShowModelsService {
  modelsRepository: IModelsRepository;

  constructor(@inject('ModelsRepository') modelsRepository: IModelsRepository) {
    this.modelsRepository = modelsRepository;
  }

  async execute(): Promise<ModelEntity[]> {
    const data = await this.modelsRepository.findAll();

    if (data.length > 0) {
      return data;
    }

    throw new AppError('Não foram encontrados resultados.');
  }
}
