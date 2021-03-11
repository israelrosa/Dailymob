import IRentalsRepository from '@modules/rentals/interfaces/IRentalsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteRentalService {
  rentalsRepository: IRentalsRepository;

  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute(id: string, renter_id: string): Promise<number> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('O aluguel não existe.');
    }

    if (rental.renter_id !== renter_id) {
      throw new AppError(
        'O usuário não tem permissão para deletar aluguéis que não o pertencem',
        'UNAUTHORIZED',
      );
    }

    if (rental.rental_status.status !== 'Pendente') {
      throw new AppError(
        'Não é possível deletar um aluguel se ele não estiver com o status "pendente".',
      );
    }
    const data = await this.rentalsRepository.delete(id);
    return data;
  }
}
