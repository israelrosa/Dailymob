import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteLocationService {
  locationsRepository: ILocationsRepository;

  constructor(
    @inject('LocationsRepository') locationsRepository: ILocationsRepository,
  ) {
    this.locationsRepository = locationsRepository;
  }

  async execute(id: string): Promise<number> {
    const data = await this.locationsRepository.delete(id);

    if (data) {
      return data;
    }
    throw new AppError('Não foi possível deletar a localização');
  }
}
