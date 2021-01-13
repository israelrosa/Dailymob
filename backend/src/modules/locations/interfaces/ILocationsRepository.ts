import LocationEntity from '../infra/typeorm/entities/LocationEntity';
import CreateLocationInput from '../infra/typeorm/inputs/CreateLocationInput';

export default interface ILocationsRepository {
  create(data: CreateLocationInput): Promise<LocationEntity>;
  delete(id: string): Promise<number | null | undefined>;
}
