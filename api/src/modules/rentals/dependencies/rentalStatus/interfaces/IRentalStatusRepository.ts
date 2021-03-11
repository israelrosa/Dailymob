import RentalStatusEntity from '../infra/typeorm/entities/RentalStatusEntity';

export default interface IRentalStatusRepository {
  findAll(): Promise<RentalStatusEntity[]>;
  findById(id: string): Promise<RentalStatusEntity | undefined>;
  findByName(name: string): Promise<RentalStatusEntity | undefined>;
}
