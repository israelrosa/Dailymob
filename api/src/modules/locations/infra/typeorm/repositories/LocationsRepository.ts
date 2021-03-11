import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import AppError from '@shared/error/AppError';
import { getRepository, Repository } from 'typeorm';
import CreateLocationInput from '../../controller/inputs/CreateLocationInput';
import LocationEntity from '../entities/LocationEntity';

export default class LocationsRepository implements ILocationsRepository {
  ormRepository: Repository<LocationEntity>;

  constructor() {
    this.ormRepository = getRepository(LocationEntity);
  }

  async create({
    city,
    complement,
    neighborhood,
    number,
    state,
    street,
    zipCode,
    user_id,
  }: CreateLocationInput): Promise<LocationEntity> {
    const data = await this.ormRepository.create({
      user_id,
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
      zipCode,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<number> {
    const result = await this.ormRepository.delete(id);
    if (result.affected) {
      return result.affected;
    }

    throw new AppError('Não foi possível deletar a localização.');
  }

  async findById(id: string): Promise<LocationEntity | undefined> {
    const data = await this.ormRepository.findOne(id, {
      relations: ['rent_pickup', 'rent_return'],
    });

    return data;
  }

  async findAllUserLocations(user_id: string): Promise<LocationEntity[]> {
    const data = await this.ormRepository.find({ where: user_id });

    return data;
  }
}
