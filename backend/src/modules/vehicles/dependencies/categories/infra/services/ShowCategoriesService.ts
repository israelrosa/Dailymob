import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../../interfaces/ICategoriesRepository';
import CategoryEntity from '../typeorm/entities/CategoryEntity';

@injectable()
export default class ShowCategoriesService {
  categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('CategoriesRepository') categoriesRepository: ICategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<CategoryEntity[]> {
    const data = await this.categoriesRepository.findAll();

    if (data.length > 0) {
      return data;
    }

    throw new AppError('Não foram encontrados resultados.');
  }
}
