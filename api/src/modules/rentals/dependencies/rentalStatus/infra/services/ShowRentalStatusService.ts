import 'reflect-metadata';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IRentalStatusRepository from '../../interfaces/IRentalStatusRepository';
import RentalStatusEntity from '../typeorm/entities/RentalStatusEntity';

@injectable()
export default class ShowRentalStatusService {
  rentalStatusRepository: IRentalStatusRepository;

  constructor(
    @inject('RentalStatusRepository')
    rentalStatusRepository: IRentalStatusRepository,
  ) {
    this.rentalStatusRepository = rentalStatusRepository;
  }

  async execute(): Promise<RentalStatusEntity[]> {
    const data = await this.rentalStatusRepository.findAll();

    if (data.length > 0) {
      return data;
    }
    throw new AppError('Não foram encontrados resultados.');
  }
}
