import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import UserEntity from '../typeorm/entities/UserEntity';
import NewUserInterface from '../controller/inputs/NewUserInterface';

@injectable()
export default class CreateUserService {
  usersRepository: IUsersRepository;

  hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('HashProvider') hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    avatar,
    email,
    firstname,
    lastname,
    password,
    phone_number,
    username,
  }: NewUserInterface): Promise<UserEntity> {
    if (await this.usersRepository.findByEmail(email)) {
      throw new AppError('O Email já está sendo utilizado.');
    }
    if (await this.usersRepository.findByUsername(username)) {
      throw new AppError('O nome de usuário já está sendo utilizado.');
    }
    if (await this.usersRepository.findByPhoneNumber(phone_number)) {
      throw new AppError(
        'O número de celular já está sendo utilizado por outro usuário.',
      );
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const result = await this.usersRepository.create({
      avatar,
      email,
      firstname,
      lastname,
      password: passwordHashed,
      phone_number,
      username,
    });

    return result;
  }
}
