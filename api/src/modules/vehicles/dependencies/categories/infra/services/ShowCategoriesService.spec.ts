import AppError from '@shared/error/AppError';
import FakeCategoriesRepository from '../typeorm/repositories/fake/FakeCategoriesRepository';
import ShowCategoriesService from './ShowCategoriesService';

describe('ShowCategories', () => {
  let categoriesRepository: FakeCategoriesRepository;

  let showCategories: ShowCategoriesService;

  beforeEach(() => {
    categoriesRepository = new FakeCategoriesRepository();

    showCategories = new ShowCategoriesService(categoriesRepository);
  });

  it('should be able to show all categories', async () => {
    await categoriesRepository.create('fadsjçfdsl');

    expect(await showCategories.execute()).toHaveLength(1);
  });

  it('should not be able to show all categories', async () => {
    await expect(showCategories.execute()).rejects.toBeInstanceOf(AppError);
  });
});
