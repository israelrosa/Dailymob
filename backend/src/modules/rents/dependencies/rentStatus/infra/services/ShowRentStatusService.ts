import 'reflect-metadata';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IRentStatusRepository from '../../interfaces/IRentStatusRepository';
import RentStatusEntity from '../typeorm/entities/RentStatusEntity';

@injectable()
export default class ShowRentStatusService {
  rentStatusRepository: IRentStatusRepository;

  constructor(
    @inject('RentStatusRepository') rentStatusRepository: IRentStatusRepository,
  ) {
    this.rentStatusRepository = rentStatusRepository;
  }

  async execute(): Promise<RentStatusEntity[]> {
    const data = await this.rentStatusRepository.findAll();

    if (data.length > 0) {
      return data;
    }
    throw new AppError('Não foram encontrados resultados.');
  }
}
