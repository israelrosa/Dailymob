import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import UserEntity from '../entities/UserEntity';
import NewUserInterface from '../inputs/NewUserInterface';

export default class UsersRepository implements IUsersRepository {
  ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity);
  }

  async create({
    avatar,
    email,
    firstname,
    lastname,
    password,
    phone_number,
    username,
  }: NewUserInterface): Promise<UserEntity> {
    const data = await this.ormRepository.create({
      avatar,
      email,
      firstname,
      lastname,
      password,
      phone_number,
      username,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  async delete(id: string): Promise<number | undefined | null> {
    const result = await this.ormRepository.delete(id);

    return result.affected;
  }

  async findAll(): Promise<UserEntity[]> {
    const data = await this.ormRepository.find();

    return data;
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const data = await this.ormRepository.findOne({ where: { email } });

    return data;
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    const data = await this.ormRepository.findOne({ where: { username } });

    return data;
  }

  async findByPhoneNumber(
    phone_number: string,
  ): Promise<UserEntity | undefined> {
    const data = await this.ormRepository.findOne({ where: { phone_number } });

    return data;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const data = await this.ormRepository.save(user);

    return data;
  }
}
