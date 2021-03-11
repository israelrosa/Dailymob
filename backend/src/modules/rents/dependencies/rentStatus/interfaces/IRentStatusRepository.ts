import RentStatusEntity from '../infra/typeorm/entities/RentStatusEntity';

export default interface IRentStatusRepository {
  findAll(): Promise<RentStatusEntity[]>;
  findById(id: string): Promise<RentStatusEntity | undefined>;
  findByName(name: string): Promise<RentStatusEntity | undefined>;
}
