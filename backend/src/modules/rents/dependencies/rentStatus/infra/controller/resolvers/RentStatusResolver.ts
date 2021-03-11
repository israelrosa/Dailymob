import { container } from 'tsyringe';
import { Query } from 'type-graphql';
import ShowRentStatusService from '../../services/ShowRentStatusService';
import RentStatusEntity from '../../typeorm/entities/RentStatusEntity';

export default class RentStatusResolver {
  @Query(() => [RentStatusEntity])
  async rentStatus(): Promise<RentStatusEntity[]> {
    const showRentStatus = container.resolve(ShowRentStatusService);

    const data = await showRentStatus.execute();
    return data;
  }
}
