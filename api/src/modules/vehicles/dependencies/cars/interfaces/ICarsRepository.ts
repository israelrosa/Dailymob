import CreateCarInput from '../infra/controller/input/CreateCarInput';
import CarsEntity from '../infra/typeorm/entities/CarsEntity';

export interface ICreateCar extends CreateCarInput {
  vehicle_id: string;
}

export default interface ICarsRepository {
  create(data: ICreateCar): Promise<CarsEntity>;
  // delete(id: string): Promise<number | null | undefined>;
  update(car: CarsEntity): Promise<CarsEntity>;
  findById(id: string): Promise<CarsEntity | undefined>;
  // findAll(): Promise<CarsEntity[]>;
}
