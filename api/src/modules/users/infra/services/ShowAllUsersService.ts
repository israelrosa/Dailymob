import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import UserEntity from '../typeorm/entities/UserEntity';

@injectable()
export default class ShowAllUsersService {
  usersRepository: IUsersRepository;

  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(): Promise<UserEntity[]> {
    const result = await this.usersRepository.findAll();

    if (result.length > 0) {
      return result;
    }
    throw new AppError('Não foram encontrados resultados.');
  }
}
