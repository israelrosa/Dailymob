import IBrandsRepository from '../../interfaces/IBrandsRepository';
import FakeBrandsRepository from '../typeorm/repositories/fake/FakeBrandsRepository';
import ValidateBrandService from './ValidateBrandService';

describe('ValidateBrand', () => {
  let brandsRepository: IBrandsRepository;

  let validateBrand: ValidateBrandService;

  beforeEach(() => {
    brandsRepository = new FakeBrandsRepository();

    validateBrand = new ValidateBrandService(brandsRepository);
  });

  it('should be able to show a brand if it exist', async () => {
    const brand = await brandsRepository.create('djafop', 'jfdspau');

    expect(await validateBrand.execute('djafop', 'jfdspau')).toMatchObject(
      brand,
    );
  });

  it('should create a new brand if it not exist', async () => {
    expect(await validateBrand.execute('fdksajçfa', 'pfsausa')).toHaveProperty(
      'id',
    );
  });
});
