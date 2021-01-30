import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import CreateLocationInput from '../controller/inputs/CreateLocationInput';
import LocationEntity from '../typeorm/entities/LocationEntity';

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
    user_id,
  }: CreateLocationInput): Promise<LocationEntity> {
    const data = this.locationsRepository.create({
      user_id,
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
