import CreateVehicleInput from '../infra/controller/inputs/CreateVehicleInput';
import VehicleEntity from '../infra/typeorm/entities/VehicleEntity';
import ICreateVehicleDTO from './ICreateVehicleDTO';

export interface ICreateVehicle extends CreateVehicleInput {
  user_id: string;
}

export default interface IVehiclesRepository {
  create(data: ICreateVehicleDTO): Promise<VehicleEntity>;
  delete(id: string): Promise<number>;
  update(vehicle: VehicleEntity): Promise<VehicleEntity>;
  findById(id: string): Promise<VehicleEntity | undefined>;
  findAll(): Promise<VehicleEntity[]>;
}
