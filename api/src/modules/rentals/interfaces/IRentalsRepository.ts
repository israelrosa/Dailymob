import CreateRentalInput from '../infra/controller/Inputs/CreateRentalInput';
import RentalEntity from '../infra/typeorm/entities/RentalEntity';

export interface ICreateRental extends CreateRentalInput {
  renter_id: string;
}

export interface CreateRentalRepository extends ICreateRental {
  lessor_id: string;
  rental_status_id: string;
}
export default interface IRentalsRepository {
  create(data: CreateRentalRepository): Promise<RentalEntity>;
  delete(id: string): Promise<number>;
  update(rental: RentalEntity): Promise<RentalEntity>;
  findById(id: string): Promise<RentalEntity | undefined>;
  findAll(): Promise<RentalEntity[]>;
  findByVehicleId(vehicle_id: string): Promise<RentalEntity[]>;
}
