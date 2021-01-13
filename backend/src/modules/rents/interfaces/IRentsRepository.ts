import CreateRentInput from '../infra/controller/Inputs/CreateRentInput';
import RentEntity from '../infra/typeorm/entities/RentEntity';

export interface ICreateRent extends CreateRentInput {
  user_id: string;
}

export default interface IRentsRepository {
  create(data: ICreateRent): Promise<RentEntity>;
  delete(id: string): Promise<number | null | undefined>;
  update(rent: RentEntity): Promise<RentEntity>;
  findById(id: string): Promise<RentEntity | undefined>;
  findAll(): Promise<RentEntity[]>;
}
