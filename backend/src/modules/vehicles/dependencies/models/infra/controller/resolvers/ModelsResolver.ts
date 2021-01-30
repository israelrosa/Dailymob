import { container } from 'tsyringe';
import { Query } from 'type-graphql';
import ShowModelsService from '../../services/ShowModelsService';
import ModelEntity from '../../typeorm/entities/ModelEntity';

export default class ModelsResolvers {
  @Query(() => [ModelEntity])
  async models(): Promise<ModelEntity[]> {
    const showModels = container.resolve(ShowModelsService);
    const data = await showModels.execute();

    return data;
  }
}
