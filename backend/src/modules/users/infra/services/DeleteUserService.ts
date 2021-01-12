import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteUserService {
  usersRepository: IUsersRepository;

  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id: string): Promise<number> {
    const result = await this.usersRepository.delete(id);

    if (result) {
      return result;
    }

    throw new Error('Não foi possível deletar o usuário.');
  }
}
