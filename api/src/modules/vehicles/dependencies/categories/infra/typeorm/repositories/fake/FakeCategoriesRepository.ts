import ICategoriesRepository from '@modules/vehicles/dependencies/categories/interfaces/ICategoriesRepository';
import { v4 as uuid } from 'uuid';
import CategoryEntity from '../../entities/CategoryEntity';

export default class FakeCategoriesRepository implements ICategoriesRepository {
  categories: CategoryEntity[] = [];

  async findAll(): Promise<CategoryEntity[]> {
    return this.categories;
  }

  async findById(id: string): Promise<CategoryEntity | undefined> {
    const data = this.categories.find(category => category.id === id);

    return data;
  }

  async create(name: string): Promise<CategoryEntity> {
    const category = new CategoryEntity();

    Object.assign(category, {
      id: uuid(),
      name,
    });

    this.categories.push(category);

    return category;
  }
}
