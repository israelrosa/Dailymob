import 'reflect-metadata';
import IRentsRepository from '@modules/rents/interfaces/IRentsRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import RentEntity from '../typeorm/entities/RentEntity';

@injectable()
export default class ShowRentsService {
  rentsRepository: IRentsRepository;

  constructor(@inject('RentsRepository') rentsRepository: IRentsRepository) {
    this.rentsRepository = rentsRepository;
  }

  async execute(): Promise<RentEntity[]> {
    const data = await this.rentsRepository.findAll();

    if (data.length > 0) {
      return data;
    }

    throw new AppError('Não foram encontrados resultados.');
  }
}
