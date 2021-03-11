import ICreateVehicleDTO from '@modules/vehicles/interfaces/ICreateVehicleDTO';
import IVehiclesRepository from '@modules/vehicles/interfaces/IVehiclesRepository';
import { v4 as uuid } from 'uuid';
import VehicleEntity from '../../entities/VehicleEntity';

export default class FakeVehiclesRepository implements IVehiclesRepository {
  vehicles: VehicleEntity[] = [];

  async create({
    brand_id,
    category_id,
    description,
    diary_value,
    model_id,
    monthly_value,
    name,
    photo,
    weekly_value,
    user_id,
    location_id,
    waiting_time,
  }: ICreateVehicleDTO): Promise<VehicleEntity> {
    const vehicle = new VehicleEntity();

    Object.assign(vehicle, {
      id: uuid(),
      brand_id,
      category_id,
      description,
      diary_value,
      model_id,
      monthly_value,
      name,
      photo,
      weekly_value,
      user_id,
      location_id,
      waiting_time,
    });

    this.vehicles.push(vehicle);

    return vehicle;
  }

  async delete(id: string): Promise<number> {
    const index = this.vehicles.findIndex(vh => vh.id === id);

    const result = this.vehicles.splice(index, 1);

    return result.length;
  }

  async findAll(): Promise<VehicleEntity[]> {
    return this.vehicles;
  }

  async findById(id: string): Promise<VehicleEntity | undefined> {
    const vehicle = this.vehicles.find(vh => vh.id === id);

    return vehicle;
  }

  async update(vehicle: VehicleEntity): Promise<VehicleEntity> {
    const index = this.vehicles.findIndex(vh => vh.id === vehicle.id);

    this.vehicles[index] = vehicle;

    return this.vehicles[index];
  }
}
