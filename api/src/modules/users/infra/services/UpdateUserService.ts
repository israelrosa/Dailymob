import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import UserEntity from '../typeorm/entities/UserEntity';

interface IRequestUpdate {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone_number: string;
  avatar: string;
}

@injectable()
export default class UpdateUserService {
  usersRepository: IUsersRepository;

  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    id,
    avatar,
    email,
    firstname,
    lastname,
    password,
    phone_number,
    username,
  }: IRequestUpdate): Promise<UserEntity> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('O Usuário não existe');
    }

    if ((await this.usersRepository.findByPhoneNumber(phone_number)) !== user) {
      throw new AppError(
        'O número de celular já está sendo utilizado por outro usuário.',
      );
    }

    if ((await this.usersRepository.findByEmail(email)) !== user) {
      throw new AppError('O Email já está sendo utilizado por outro usuário.');
    }

    if ((await this.usersRepository.findByUsername(username)) !== user) {
      throw new AppError(
        'O nome de usuário já está sendo utilizado por outro usuário.',
      );
    }

    Object.assign(user, {
      avatar,
      email,
      firstname,
      lastname,
      password,
      phone_number,
      username,
    });

    const result = await this.usersRepository.update(user);

    return result;
  }
}
