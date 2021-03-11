import IRentsRepository, {
  CreateRentRepository,
} from '@modules/rents/interfaces/IRentsRepository';
import { v4 as uuid } from 'uuid';
import RentEntity from '../../entities/RentEntity';

export default class FakeRentsRepository implements IRentsRepository {
  rents: RentEntity[] = [];

  async create({
    initial_date,
    rent_status_id,
    return_date,
    renter_id,
    vehicle_id,
    lessor_id,
  }: CreateRentRepository): Promise<RentEntity> {
    const rent = new RentEntity();

    Object.assign(rent, {
      id: uuid(),
      initial_date,
      rent_status_id,
      return_date,
      renter_id,
      vehicle_id,
      rent_status: {},
      lessor_id,
    });

    this.rents.push(rent);

    return rent;
  }

  async delete(id: string): Promise<number> {
    const index = this.rents.findIndex(rent => rent.id === id);

    const result = this.rents.splice(index, 1);

    return result.length;
  }

  async findAll(): Promise<RentEntity[]> {
    return this.rents;
  }

  async findById(id: string): Promise<RentEntity | undefined> {
    const data = this.rents.find(rent => rent.id === id);

    return data;
  }

  async update(rent: RentEntity): Promise<RentEntity> {
    const index = this.rents.findIndex(rt => rt.id === rent.id);

    this.rents[index] = rent;

    return this.rents[index];
  }

  async findByVehicleId(vehicle_id: string): Promise<RentEntity[]> {
    const data = this.rents.filter(rent => rent.vehicle_id === vehicle_id);

    return data;
  }
}
