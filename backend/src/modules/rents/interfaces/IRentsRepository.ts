import CreateRentInput from '../infra/controller/Inputs/CreateRentInput';
import RentEntity from '../infra/typeorm/entities/RentEntity';

export interface ICreateRent extends CreateRentInput {
  renter_id: string;
}

export interface CreateRentRepository extends ICreateRent {
  lessor_id: string;
  rent_status_id: string;
}
export default interface IRentsRepository {
  create(data: CreateRentRepository): Promise<RentEntity>;
  delete(id: string): Promise<number>;
  update(rent: RentEntity): Promise<RentEntity>;
  findById(id: string): Promise<RentEntity | undefined>;
  findAll(): Promise<RentEntity[]>;
  findByVehicleId(vehicle_id: string): Promise<RentEntity[]>;
}
