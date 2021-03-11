import BrandEntity from '../infra/typeorm/entities/BrandEntity';

export default interface IBrandsRepository {
  findAll(): Promise<BrandEntity[]>;
  findById(id: string): Promise<BrandEntity | undefined>;
  findByName(name: string): Promise<BrandEntity | undefined>;
  create(name: string, category_id: string): Promise<BrandEntity>;
}
