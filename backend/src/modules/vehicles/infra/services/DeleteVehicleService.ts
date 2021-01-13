import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteVehicleService {
  vehiclesRepository: IVehiclesRepository;

  constructor(
    @inject('VehiclesRepository') vehiclesRepository: IVehiclesRepository,
  ) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute(id: string, user_id: string): Promise<number> {
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      throw new AppError('O veículo não existe');
    }
    if (vehicle.user_id !== user_id) {
      throw new AppError(
        'O usuário não tem permissão para deletar um veículo que não o pertence',
      );
    }
    const data = await this.vehiclesRepository.delete(id);

    if (data) {
      return data;
    }

    throw new AppError('Não foi possível deletar o veículo.');
  }
}
