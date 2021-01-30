import AppError from '@shared/error/AppError';
import IModelsRepository from '../../interfaces/IModelsRepository';
import FakeModelsRepository from '../typeorm/repositories/fake/FakeModelsRepository';
import ShowModelsService from './ShowModelsService';

describe('ShowModels', () => {
  let modelsRepository: IModelsRepository;

  let showModels: ShowModelsService;

  beforeEach(() => {
    modelsRepository = new FakeModelsRepository();

    showModels = new ShowModelsService(modelsRepository);
  });

  it('should be able to show all models', async () => {
    await modelsRepository.create('ijfsdpau', 'jfidpasupof');
    await modelsRepository.create('jifdsaklçjfçasd', 'jfdpsup');

    expect(await showModels.execute()).toHaveLength(2);
  });

  it('should not be able to show all models', async () => {
    await expect(showModels.execute()).rejects.toBeInstanceOf(AppError);
  });
});
