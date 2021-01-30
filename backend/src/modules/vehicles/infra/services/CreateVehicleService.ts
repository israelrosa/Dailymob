import ValidateBrandService from '@modules/vehicles/dependencies/brands/infra/services/ValidateBrandService';
import IBrandsRepository from '@modules/vehicles/dependencies/brands/interfaces/IBrandsRepository';
import ICategoriesRepository from '@modules/vehicles/dependencies/categories/interfaces/ICategoriesRepository';
import ValidateModelService from '@modules/vehicles/dependencies/models/infra/services/ValidateModelService';
import IModelsRepository from '@modules/vehicles/dependencies/models/interfaces/IModelsRepository';
import IVehiclesRepository, {
  ICreateVehicle,
} from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import VehicleEntity from '../typeorm/entities/VehicleEntity';

@injectable()
export default class CreateVehicleService {
  vehiclesRepository: IVehiclesRepository;

  categoriesRepository: ICategoriesRepository;

  brandsRepository: IBrandsRepository;

  modelsRepository: IModelsRepository;

  constructor(
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
    @inject('CategoriesRepository') categoriesRepository: ICategoriesRepository,
    @inject('BrandsRepository') brandsRepository: IBrandsRepository,
    @inject('ModelsRepository') modelsRepository: IModelsRepository,
  ) {
    this.vehiclesRepository = vehiclesRepository;
    this.categoriesRepository = categoriesRepository;
    this.brandsRepository = brandsRepository;
    this.modelsRepository = modelsRepository;
  }

  async execute({
    user_id,
    model,
    category_id,
    description,
    diary_value,
    brand,
    monthly_value,
    name,
    photo,
    location_id,
    weekly_value,
    waiting_time,
  }: ICreateVehicle): Promise<VehicleEntity> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('A categoria não existe');
    }
    const validateBrand = new ValidateBrandService(this.brandsRepository);
    const validateModel = new ValidateModelService(this.modelsRepository);

    const verifiedBrand = await validateBrand.execute(brand, category_id);
    const verifiedModel = await validateModel.execute(model, verifiedBrand.id);

    const data = await this.vehiclesRepository.create({
      user_id,
      brand_id: verifiedBrand.id,
      category_id,
      description,
      diary_value,
      model_id: verifiedModel.id,
      monthly_value,
      name,
      photo,
      weekly_value,
      location_id,
      waiting_time,
    });

    return data;
  }
}
