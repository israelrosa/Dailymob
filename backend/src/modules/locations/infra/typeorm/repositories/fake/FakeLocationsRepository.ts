import CreateLocationInput from '@modules/locations/infra/controller/inputs/CreateLocationInput';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import { v4 as uuid } from 'uuid';
import LocationEntity from '../../entities/LocationEntity';

export default class FakeLocationsRepository implements ILocationsRepository {
  locations: LocationEntity[] = [];

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
    const location = new LocationEntity();

    Object.assign(location, {
      id: uuid(),
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
      zipCode,
      user_id,
    });

    this.locations.push(location);
    return location;
  }

  async delete(id: string): Promise<number> {
    const index = this.locations.findIndex(lc => lc.id === id);

    const result = this.locations.splice(index, 1);

    return result.length;
  }

  async findById(id: string): Promise<LocationEntity | undefined> {
    const data = this.locations.find(lc => lc.id === id);

    return data;
  }

  async findAllUserLocations(user_id: string): Promise<LocationEntity[]> {
    const data = this.locations.filter(lc => lc.user_id === user_id);

    return data;
  }
}
