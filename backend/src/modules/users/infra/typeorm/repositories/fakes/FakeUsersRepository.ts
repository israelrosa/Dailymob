import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import { v4 as uuid } from 'uuid';
import UserEntity from '../../entities/UserEntity';
import NewUserInterface from '../../../controller/inputs/NewUserInterface';

export default class FakeUsersRepository implements IUsersRepository {
  private users: UserEntity[] = [];

  async create({
    avatar,
    email,
    firstname,
    lastname,
    password,
    phone_number,
    username,
  }: NewUserInterface): Promise<UserEntity> {
    const user = new UserEntity();

    Object.assign(user, {
      id: uuid(),
      avatar,
      email,
      firstname,
      lastname,
      password,
      phone_number,
      username,
    });

    return user;
  }

  async delete(id: string): Promise<number | undefined | null> {
    const index = this.users.findIndex(user => user.id === id);

    const number = this.users.splice(index, 1);

    return number.length;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const userFound = this.users.find(user => user.id === id);

    return userFound;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const userFound = this.users.find(user => user.email === email);

    return userFound;
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    const userFound = this.users.find(user => user.username === username);

    return userFound;
  }

  async findByPhoneNumber(
    phone_number: string,
  ): Promise<UserEntity | undefined> {
    const userFound = this.users.find(
      user => user.phone_number === phone_number,
    );

    return userFound;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const index = this.users.findIndex(usr => usr.id === user.id);

    this.users[index] = user;

    return this.users[index];
  }
}
