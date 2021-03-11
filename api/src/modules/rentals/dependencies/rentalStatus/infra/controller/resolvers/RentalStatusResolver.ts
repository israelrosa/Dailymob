import { container } from 'tsyringe';
import { Query } from 'type-graphql';
import ShowRentalStatusService from '../../services/ShowRentalStatusService';
import RentalStatusEntity from '../../typeorm/entities/RentalStatusEntity';

export default class RentalStatusResolver {
  @Query(() => [RentalStatusEntity])
  async rentalStatus(): Promise<RentalStatusEntity[]> {
    const showRentalStatus = container.resolve(ShowRentalStatusService);

    const data = await showRentalStatus.execute();
    return data;
  }
}
