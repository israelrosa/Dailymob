import { inject, injectable } from 'tsyringe';
import IBrandsRepository from '../../interfaces/IBrandsRepository';
import BrandEntity from '../typeorm/entities/BrandEntity';

@injectable()
export default class ValidateBrandService {
  brandsRepository: IBrandsRepository;

  constructor(@inject('BrandsRepository') brandsRepository: IBrandsRepository) {
    this.brandsRepository = brandsRepository;
  }

  async execute(brand: string, category_id: string): Promise<BrandEntity> {
    const brandExist = await this.brandsRepository.findByName(brand);

    if (!brandExist) {
      const newBrand = await this.brandsRepository.create(brand, category_id);
      return newBrand;
    }
    return brandExist;
  }
}
