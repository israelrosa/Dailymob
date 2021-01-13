import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import { inject, injectable } from 'tsyringe';
import LocationEntity from '../typeorm/entities/LocationEntity';
import CreateLocationInput from '../typeorm/inputs/CreateLocationInput';

@injectable()
export default class CreateLocationService {
  locationsRepository: ILocationsRepository;

  constructor(
    @inject('LocationsRepository') locationsRepository: ILocationsRepository,
  ) {
    this.locationsRepository = locationsRepository;
  }

  async execute({
    city,
    complement,
    neighborhood,
    number,
    state,
    street,
    zipCode,
  }: CreateLocationInput): Promise<LocationEntity> {
    const data = this.locationsRepository.create({
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
      zipCode,
    });

    return data;
  }
}
