import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteRentService {
  rentsRepository: IRentsRepository;

  constructor(@inject('RentsRepository') rentsRepository: IRentsRepository) {
    this.rentsRepository = rentsRepository;
  }

  async execute(id: string, user_id: string): Promise<number> {
    const rent = await this.rentsRepository.findById(id);

    if (!rent) {
      throw new AppError('O aluguel não existe.');
    }

    if (rent.user_id !== user_id) {
      throw new AppError(
        'O usuário não tem permissão para deletar aluguéis que não o pertencem',
      );
    }
    const data = await this.rentsRepository.delete(id);

    if (data) {
      return data;
    }
    throw new AppError('Não foi possível deletar o aluguel do veículo.');
  }
}
