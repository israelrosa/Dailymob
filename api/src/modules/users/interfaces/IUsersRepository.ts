import UserEntity from '../infra/typeorm/entities/UserEntity';
import NewUserInterface from '../infra/typeorm/inputs/NewUserInterface';

export default interface IUsersRepository {
  create(data: NewUserInterface): Promise<UserEntity>;
  delete(id: string): Promise<number | undefined | null>;
  update(user: UserEntity): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | undefined>;
  findByUsername(username: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  findByPhoneNumber(phone_number: string): Promise<UserEntity | undefined>;
}
