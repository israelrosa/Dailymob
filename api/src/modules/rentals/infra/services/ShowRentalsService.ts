import 'reflect-metadata';
import IRentalsRepository from '@modules/rentals/interfaces/IRentalsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import RentalEntity from '../typeorm/entities/RentalEntity';

@injectable()
export default class ShowRentalsService {
  rentalsRepository: IRentalsRepository;

  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute(): Promise<RentalEntity[]> {
    const data = await this.rentalsRepository.findAll();

    if (data.length > 0) {
      return data;
    }

    throw new AppError('Não foram encontrados resultados.');
  }
}
