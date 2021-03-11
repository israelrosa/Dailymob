import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IBrandsRepository from '../../interfaces/IBrandsRepository';
import BrandEntity from '../typeorm/entities/BrandEntity';

@injectable()
export default class ShowBrandsService {
  brandsRepository: IBrandsRepository;

  constructor(@inject('BrandsRepository') brandsRepository: IBrandsRepository) {
    this.brandsRepository = brandsRepository;
  }

  async execute(): Promise<BrandEntity[]> {
    const data = await this.brandsRepository.findAll();

    if (data.length > 0) {
      return data;
    }

    throw new AppError('Não foram encontrados resultados.');
  }
}
