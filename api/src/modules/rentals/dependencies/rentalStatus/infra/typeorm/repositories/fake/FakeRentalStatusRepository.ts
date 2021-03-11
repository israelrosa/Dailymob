import IRentalStatusRepository from '@modules/rentals/dependencies/rentalStatus/interfaces/IRentalStatusRepository';
import { v4 as uuid } from 'uuid';
import RentalStatusEntity from '../../entities/RentalStatusEntity';

export default class FakeRentalStatusRepository
  implements IRentalStatusRepository {
  rentalStatus: RentalStatusEntity[] = [
    { id: uuid(), status: 'Pendente' },
    { id: uuid(), status: 'Negado' },
    { id: uuid(), status: 'Cancelado' },
    { id: uuid(), status: 'Confirmado' },
    { id: uuid(), status: 'Encerrado' },
    { id: uuid(), status: 'Em Atraso' },
  ];

  async findAll(): Promise<RentalStatusEntity[]> {
    return this.rentalStatus;
  }

  async findById(id: string): Promise<RentalStatusEntity | undefined> {
    const status = this.rentalStatus.find(st => st.id === id);

    return status;
  }

  async findByName(name: string): Promise<RentalStatusEntity | undefined> {
    const status = this.rentalStatus.find(st => st.status === name);

    return status;
  }

  async deleteAll(): Promise<void> {
    this.rentalStatus = [];
  }
}
