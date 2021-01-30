import IRentStatusRepository from '@modules/rents/dependencies/rentStatus/interfaces/IRentStatusRepository';
import { v4 as uuid } from 'uuid';
import RentStatusEntity from '../../entities/RentStatusEntity';

export default class FakeRentStatusRepository implements IRentStatusRepository {
  rentStatus: RentStatusEntity[] = [
    { id: uuid(), status: 'Pendente' },
    { id: uuid(), status: 'Negado' },
    { id: uuid(), status: 'Cancelado' },
    { id: uuid(), status: 'Confirmado' },
    { id: uuid(), status: 'Encerrado' },
    { id: uuid(), status: 'Em Atraso' },
  ];

  async findAll(): Promise<RentStatusEntity[]> {
    return this.rentStatus;
  }

  async findById(id: string): Promise<RentStatusEntity | undefined> {
    const status = this.rentStatus.find(st => st.id === id);

    return status;
  }

  async findByName(name: string): Promise<RentStatusEntity | undefined> {
    const status = this.rentStatus.find(st => st.status === name);

    return status;
  }

  async deleteAll(): Promise<void> {
    this.rentStatus = [];
  }
}
