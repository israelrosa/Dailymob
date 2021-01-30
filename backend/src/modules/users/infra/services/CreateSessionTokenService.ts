import auth from '@config/auth';
import IResponseToken from '@modules/users/interfaces/IResponseToken';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/error/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import UserEntity from '../typeorm/entities/UserEntity';
import CreateSessionInterface from '../controller/inputs/CreateSessionInterface';

@injectable()
export default class CreateSessionToken {
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
    email,
    password,
    phone_number,
    username,
  }: CreateSessionInterface): Promise<IResponseToken> {
    if (email) {
      const user = await this.usersRepository.findByEmail(email);

      if (user) {
        const token = await this.createToken(user, password);

        return { user, token };
      }
      throw new AppError('Combinação Incorreta.');
    } else if (phone_number) {
      const user = await this.usersRepository.findByPhoneNumber(phone_number);

      if (user) {
        const token = await this.createToken(user, password);
        return { user, token };
      }
      throw new AppError('Combinação Incorreta.');
    } else if (username) {
      const user = await this.usersRepository.findByUsername(username);

      if (user) {
        const token = await this.createToken(user, password);
        return { user, token };
      }
      throw new AppError('Combinação Incorreta.');
    }

    throw new AppError('É necessário se identificar.');
  }

  private async createToken(
    user: UserEntity,
    password: string,
  ): Promise<string> {
    if (await this.hashProvider.compareHash(password, user.password)) {
      const token = sign({}, auth.secret, {
        expiresIn: auth.expiresIn,
        subject: user.id,
      });

      return token;
    }
    throw new AppError('Combinação Incorreta.');
  }
}
