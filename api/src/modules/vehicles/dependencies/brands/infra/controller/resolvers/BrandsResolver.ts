import { container } from 'tsyringe';
import { Query } from 'type-graphql';
import ShowBrandsService from '../../services/ShowBrandsService';
import BrandEntity from '../../typeorm/entities/BrandEntity';

export default class BrandsResolver {
  @Query(() => [BrandEntity])
  async brands(): Promise<BrandEntity[]> {
    const showBrands = container.resolve(ShowBrandsService);
    const data = await showBrands.execute();

    return data;
  }
}
