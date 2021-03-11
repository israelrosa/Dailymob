import IRentalsRepository, {
  CreateRentalRepository,
} from '@modules/rentals/interfaces/IRentalsRepository';
import { v4 as uuid } from 'uuid';
import RentalEntity from '../../entities/RentalEntity';

export default class FakeRentalsRepository implements IRentalsRepository {
  rentals: RentalEntity[] = [];

  async create({
    initial_date,
    rental_status_id,
    return_date,
    renter_id,
    vehicle_id,
    lessor_id,
  }: CreateRentalRepository): Promise<RentalEntity> {
    const rental = new RentalEntity();

    Object.assign(rental, {
      id: uuid(),
      initial_date,
      rental_status_id,
      return_date,
      renter_id,
      vehicle_id,
      rental_status: {},
      lessor_id,
    });

    this.rentals.push(rental);

    return rental;
  }

  async delete(id: string): Promise<number> {
    const index = this.rentals.findIndex(rental => rental.id === id);

    const result = this.rentals.splice(index, 1);

    return result.length;
  }

  async findAll(): Promise<RentalEntity[]> {
    return this.rentals;
  }

  async findById(id: string): Promise<RentalEntity | undefined> {
    const data = this.rentals.find(rental => rental.id === id);

    return data;
  }

  async update(rental: RentalEntity): Promise<RentalEntity> {
    const index = this.rentals.findIndex(rt => rt.id === rental.id);

    this.rentals[index] = rental;

    return this.rentals[index];
  }

  async findByVehicleId(vehicle_id: string): Promise<RentalEntity[]> {
    const data = this.rentals.filter(
      rental => rental.vehicle_id === vehicle_id,
    );

    return data;
  }
}
