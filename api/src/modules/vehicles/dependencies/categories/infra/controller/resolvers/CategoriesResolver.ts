import { container } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import ShowCategoriesService from '../../services/ShowCategoriesService';
import CategoryEntity from '../../typeorm/entities/CategoryEntity';

@Resolver()
export default class CategoriesResolver {
  @Query(() => [CategoryEntity])
  async categories(): Promise<CategoryEntity[]> {
    const findCategories = container.resolve(ShowCategoriesService);

    const data = await findCategories.execute();
    return data;
  }
}
