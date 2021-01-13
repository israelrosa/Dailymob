import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import { getRepository, Repository } from 'typeorm';
import LocationEntity from '../entities/LocationEntity';
import CreateLocationInput from '../inputs/CreateLocationInput';

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
  }: CreateLocationInput): Promise<LocationEntity> {
    const data = await this.ormRepository.create({
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

  async delete(id: string): Promise<number | null | undefined> {
    const result = await this.ormRepository.delete(id);

    return result.affected;
  }
}
