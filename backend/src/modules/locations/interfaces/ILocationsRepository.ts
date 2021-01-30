import CreateLocationInput from '../infra/controller/inputs/CreateLocationInput';
import LocationEntity from '../infra/typeorm/entities/LocationEntity';

export default interface ILocationsRepository {
  create(data: CreateLocationInput): Promise<LocationEntity>;
  delete(id: string): Promise<number>;
  findById(id: string): Promise<LocationEntity | undefined>;
  findAllUserLocations(user_id: string): Promise<LocationEntity[]>;
}
