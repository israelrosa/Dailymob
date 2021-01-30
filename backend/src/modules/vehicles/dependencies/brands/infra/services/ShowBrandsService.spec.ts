import AppError from '@shared/error/AppError';
import IBrandsRepository from '../../interfaces/IBrandsRepository';
import FakeBrandsRepository from '../typeorm/repositories/fake/FakeBrandsRepository';
import ShowBrandsService from './ShowBrandsService';

describe('ShowBrands', () => {
  let brandsRepository: IBrandsRepository;

  let showBrands: ShowBrandsService;

  beforeEach(() => {
    brandsRepository = new FakeBrandsRepository();

    showBrands = new ShowBrandsService(brandsRepository);
  });

  it('should be able to show all brands', async () => {
    await brandsRepository.create('jfdpsadj', 'iufpadsuhç');
    await brandsRepository.create('jfdpsadjfsdag', 'iufpadsuhçfdsa');

    expect(await showBrands.execute()).toHaveLength(2);
  });

  it('should not be able to show all brands', async () => {
    await expect(showBrands.execute()).rejects.toBeInstanceOf(AppError);
  });
});
