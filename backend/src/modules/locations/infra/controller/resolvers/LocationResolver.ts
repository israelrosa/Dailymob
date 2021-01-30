import UserContext from '@shared/auth/UserContext';
import { container } from 'tsyringe';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import CreateLocationService from '../../services/CreateLocationService';
import DeleteLocationService from '../../services/DeleteLocationService';
import LocationEntity from '../../typeorm/entities/LocationEntity';
import CreateLocationInput from '../inputs/CreateLocationInput';

@Resolver()
export default class LocationResolver {
  @Authorized()
  @Mutation(() => LocationEntity)
  async newLocation(
    @Arg('data')
    {
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
      zipCode,
    }: CreateLocationInput,
    @Ctx() ctx: UserContext,
  ): Promise<LocationEntity> {
    const createLocation = container.resolve(CreateLocationService);
    const data = await createLocation.execute({
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
      zipCode,
      user_id: ctx.id,
    });
    return data;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteLocation(
    @Arg('id') id: string,
    @Ctx() ctx: UserContext,
  ): Promise<boolean> {
    const deleteLocationService = container.resolve(DeleteLocationService);
    const data = await deleteLocationService.execute(id, ctx.id);

    if (data > 0) {
      return true;
    }
    return false;
  }
}
