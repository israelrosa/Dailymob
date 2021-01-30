import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteRentService {
  rentsRepository: IRentsRepository;

  constructor(@inject('RentsRepository') rentsRepository: IRentsRepository) {
    this.rentsRepository = rentsRepository;
  }

  async execute(id: string, renter_id: string): Promise<number> {
    const rent = await this.rentsRepository.findById(id);

    if (!rent) {
      throw new AppError('O aluguel não existe.');
    }

    if (rent.renter_id !== renter_id) {
      throw new AppError(
        'O usuário não tem permissão para deletar aluguéis que não o pertencem',
        'UNAUTHORIZED',
      );
    }

    if (rent.rent_status.status !== 'Pendente') {
      throw new AppError(
        'Não é possível deletar um aluguel se ele não estiver com o status "pendente".',
      );
    }
    const data = await this.rentsRepository.delete(id);
    return data;
  }
}
