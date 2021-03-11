import ValidateBrandService from '@modules/vehicles/dependencies/brands/infra/services/ValidateBrandService';
import IBrandsRepository from '@modules/vehicles/dependencies/brands/interfaces/IBrandsRepository';
import ValidateModelService from '@modules/vehicles/dependencies/models/infra/services/ValidateModelService';
import IModelsRepository from '@modules/vehicles/dependencies/models/interfaces/IModelsRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import UpdateVehicleInput from '../controller/inputs/UpdateVehicleInput';
import VehicleEntity from '../typeorm/entities/VehicleEntity';

interface IParams extends UpdateVehicleInput {
  user_id: string;
}

@injectable()
export default class UpdateVehicleService {
  vehiclesRepository: IVehiclesRepository;

  brandsRepository: IBrandsRepository;

  modelsRepository: IModelsRepository;

  constructor(
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
    @inject('BrandsRepository') brandsRepository: IBrandsRepository,
    @inject('ModelsRepository') modelsRepository: IModelsRepository,
  ) {
    this.vehiclesRepository = vehiclesRepository;
    this.brandsRepository = brandsRepository;
    this.modelsRepository = modelsRepository;
  }

  async execute({
    id,
    brand,
    category_id,
    description,
    diary_value,
    model,
    monthly_value,
    name,
    photo,
    user_id,
    weekly_value,
    location_id,
    waiting_time,
  }: IParams): Promise<VehicleEntity> {
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      throw new AppError('O veículo não existe');
    }

    if (vehicle.user_id !== user_id) {
      throw new AppError(
        'O usuário não tem permissão para atualizar um veículo que não o pertence.',
        'UNAUTHORIZED',
      );
    }

    const validateBrand = new ValidateBrandService(this.brandsRepository);
    const validateModel = new ValidateModelService(this.modelsRepository);

    const verifiedBrand = await validateBrand.execute(brand, category_id);
    const verifiedModel = await validateModel.execute(model, verifiedBrand.id);

    Object.assign(vehicle, {
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

    const data = await this.vehiclesRepository.update(vehicle);

    return data;
  }
}
