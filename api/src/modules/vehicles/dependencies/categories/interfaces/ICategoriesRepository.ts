import CategoryEntity from '../infra/typeorm/entities/CategoryEntity';

export default interface ICategoriesRepository {
  findAll(): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity | undefined>;
}
