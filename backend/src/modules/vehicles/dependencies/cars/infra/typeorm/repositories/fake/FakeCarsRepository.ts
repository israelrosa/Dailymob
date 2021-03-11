import ICarsRepository, {
  ICreateCar,
} from '@modules/vehicles/dependencies/cars/interfaces/ICarsRepository';
import { v4 as uuid } from 'uuid';
import CarsEntity from '../../entities/CarsEntity';

export default class FakeCarsRepository implements ICarsRepository {
  cars: CarsEntity[] = [];

  async create({
    air_bag,
    air_conditioning,
    capacity,
    doors,
    max_speed,
    vehicle_id,
  }: ICreateCar): Promise<CarsEntity> {
    const car = new CarsEntity();

    Object.assign(car, {
      id: uuid(),
      air_bag,
      air_conditioning,
      capacity,
      doors,
      max_speed,
      vehicle_id,
    });

    this.cars.push(car);

    return car;
  }

  async findById(id: string): Promise<CarsEntity | undefined> {
    const car = this.cars.find(cr => cr.id === id);

    return car;
  }

  async update(car: CarsEntity): Promise<CarsEntity> {
    const index = this.cars.findIndex(cr => cr.id === car.id);
    this.cars[index] = car;

    return this.cars[index];
  }
}
