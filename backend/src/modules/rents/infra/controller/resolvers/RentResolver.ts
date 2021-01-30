import UserContext from '@shared/auth/UserContext';
import { container } from 'tsyringe';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import CreateRentService from '../../services/CreateRentService';
import DeleteRentService from '../../services/DeleteRentService';
import ShowRentsService from '../../services/ShowRentsService';
import UpdateRentService from '../../services/UpdateRentService';
import RentEntity from '../../typeorm/entities/RentEntity';
import CreateRentInput from '../Inputs/CreateRentInput';
import UpdateRentInput from '../Inputs/UpdateRentInput';

@Resolver()
export default class RentResolver {
  @Authorized()
  @Mutation(() => RentEntity)
  async newRent(
    @Arg('data')
    { initial_date, return_date, vehicle_id }: CreateRentInput,
    @Ctx() ctx: UserContext,
  ): Promise<RentEntity> {
    const createRent = container.resolve(CreateRentService);
    const data = await createRent.execute({
      initial_date,
      return_date,
      renter_id: ctx.id,
      vehicle_id,
    });

    return data;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteRent(
    @Arg('id') id: string,
    @Ctx() ctx: UserContext,
  ): Promise<boolean> {
    const deleteRentService = container.resolve(DeleteRentService);
    const data = await deleteRentService.execute(id, ctx.id);

    if (data > 0) {
      return true;
    }
    return false;
  }

  @Authorized()
  @Mutation(() => RentEntity)
  async updateRent(
    @Arg('data')
    { id, initial_date, rent_status_id, return_date }: UpdateRentInput,
    @Ctx() ctx: UserContext,
  ): Promise<RentEntity> {
    const updateRentService = container.resolve(UpdateRentService);
    const data = await updateRentService.execute({
      id,
      initial_date,
      rent_status_id,
      return_date,
      renter_id: ctx.id,
    });

    return data;
  }

  @Query(() => [RentEntity])
  async rents(): Promise<RentEntity[]> {
    const showRents = container.resolve(ShowRentsService);
    const data = showRents.execute();
    return data;
  }
}
