import UserContext from '@shared/auth/UserContext';
import { container } from 'tsyringe';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import CreateRentalService from '../../services/CreateRentalService';
import DeleteRentalService from '../../services/DeleteRentalService';
import ShowRentalsService from '../../services/ShowRentalsService';
import UpdateRentalService from '../../services/UpdateRentalService';
import RentalEntity from '../../typeorm/entities/RentalEntity';
import CreateRentalInput from '../Inputs/CreateRentalInput';
import UpdateRentalInput from '../Inputs/UpdateRentalInput';

@Resolver()
export default class RentalResolver {
  @Authorized()
  @Mutation(() => RentalEntity)
  async newRental(
    @Arg('data')
    { initial_date, return_date, vehicle_id }: CreateRentalInput,
    @Ctx() ctx: UserContext,
  ): Promise<RentalEntity> {
    const createRental = container.resolve(CreateRentalService);
    const data = await createRental.execute({
      initial_date,
      return_date,
      renter_id: ctx.id,
      vehicle_id,
    });

    return data;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteRental(
    @Arg('id') id: string,
    @Ctx() ctx: UserContext,
  ): Promise<boolean> {
    const deleteRentalService = container.resolve(DeleteRentalService);
    const data = await deleteRentalService.execute(id, ctx.id);

    if (data > 0) {
      return true;
    }
    return false;
  }

  @Authorized()
  @Mutation(() => RentalEntity)
  async updateRental(
    @Arg('data')
    { id, initial_date, rental_status_id, return_date }: UpdateRentalInput,
    @Ctx() ctx: UserContext,
  ): Promise<RentalEntity> {
    const updateRentalService = container.resolve(UpdateRentalService);
    const data = await updateRentalService.execute({
      id,
      initial_date,
      rental_status_id,
      return_date,
      renter_id: ctx.id,
    });

    return data;
  }

  @Query(() => [RentalEntity])
  async rentals(): Promise<RentalEntity[]> {
    const showRentals = container.resolve(ShowRentalsService);
    const data = showRentals.execute();
    return data;
  }
}
