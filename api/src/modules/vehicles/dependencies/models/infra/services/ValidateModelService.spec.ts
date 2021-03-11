import IModelsRepository from '../../interfaces/IModelsRepository';
import FakeModelsRepository from '../typeorm/repositories/fake/FakeModelsRepository';
import ValidateModelService from './ValidateModelService';

describe('ValidateModel', () => {
  let modelsRepository: IModelsRepository;

  let validateModel: ValidateModelService;

  beforeEach(() => {
    modelsRepository = new FakeModelsRepository();

    validateModel = new ValidateModelService(modelsRepository);
  });

  it('should be able to show a model', async () => {
    const model = await modelsRepository.create('jfidpoau', 'jfdsuap');

    expect(await validateModel.execute('jfidpoau', 'jfdsuap')).toMatchObject(
      model,
    );
  });

  it('should create a new model', async () => {
    expect(
      await validateModel.execute('ijfdspajf', 'jfdopasup'),
    ).toHaveProperty('id');
  });
});
