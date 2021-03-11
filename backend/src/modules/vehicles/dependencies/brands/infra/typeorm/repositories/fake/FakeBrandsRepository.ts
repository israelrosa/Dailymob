import IBrandsRepository from '@modules/vehicles/dependencies/brands/interfaces/IBrandsRepository';
import { v4 as uuid } from 'uuid';
import BrandEntity from '../../entities/BrandEntity';

export default class FakeBrandsRepository implements IBrandsRepository {
  brands: BrandEntity[] = [];

  async findAll(): Promise<BrandEntity[]> {
    return this.brands;
  }

  async findById(id: string): Promise<BrandEntity | undefined> {
    const data = this.brands.find(brand => brand.id === id);

    return data;
  }

  async create(name: string, category_id: string): Promise<BrandEntity> {
    const brand = new BrandEntity();

    Object.assign(brand, {
      id: uuid(),
      name,
      category_id,
    });

    this.brands.push(brand);

    return brand;
  }

  async findByName(name: string): Promise<BrandEntity | undefined> {
    const data = this.brands.find(brand => brand.name === name);

    return data;
  }
}
