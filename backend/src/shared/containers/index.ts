import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import { container } from 'tsyringe';
import '@modules/users/providers';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import LocationsRepository from '@modules/locations/infra/typeorm/repositories/LocationsRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import VehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/VehiclesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ILocationsRepository>(
  'LocationsRepository',
  LocationsRepository,
);

container.registerSingleton<IVehiclesRepository>(
  'VehiclesRepository',
  VehiclesRepository,
);
