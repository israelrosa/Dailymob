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

  async execute(id: string, user_id: string): Promise<number> {
    const location = await this.locationsRepository.findById(id);

    if (!location) {
      throw new AppError('A localização não existe.');
    }

    if (location.user_id !== user_id) {
      throw new AppError(
        'O usuário não tem permissão para deletar a localização.',
        'UNAUTHENTICATED',
      );
    }
    const data = await this.locationsRepository.delete(id);

    return data;
  }
}
