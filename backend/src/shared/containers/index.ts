import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import { container } from 'tsyringe';
import '@modules/users/providers';
import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import LocationsRepository from '@modules/locations/infra/typeorm/repositories/LocationsRepository';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import VehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/VehiclesRepository';
import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import RentsRepository from '@modules/rents/infra/typeorm/repositories/RentsRepository';
import ICarsRepository from '@modules/vehicles/dependencies/cars/interfaces/ICarsRepository';
import CarsRepository from '@modules/vehicles/dependencies/cars/infra/typeorm/repositories/CarsRepository';
import ICategoriesRepository from '@modules/vehicles/dependencies/categories/interfaces/ICategoriesRepository';
import CategoriesRepository from '@modules/vehicles/dependencies/categories/infra/typeorm/repositories/CategoriesRepository';
import IBrandsRepository from '@modules/vehicles/dependencies/brands/interfaces/IBrandsRepository';
import BrandsRepository from '@modules/vehicles/dependencies/brands/infra/typeorm/repositories/BrandsRepository';
import IRentStatusRepository from '@modules/rents/dependencies/rentStatus/interfaces/IRentStatusRepository';
import RentStatusRepository from '@modules/rents/dependencies/rentStatus/infra/typeorm/repositories/RentStatusRepository';

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

container.registerSingleton<IRentsRepository>(
  'RentsRepository',
  RentsRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IBrandsRepository>(
  'BrandsRepository',
  BrandsRepository,
);

container.registerSingleton<IRentStatusRepository>(
  'RentStatusRepository',
  RentStatusRepository,
);
