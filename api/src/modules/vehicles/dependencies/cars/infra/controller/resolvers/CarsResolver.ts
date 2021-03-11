import UserContext from '@shared/auth/UserContext';
import { container } from 'tsyringe';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import CarsEntity from '../../typeorm/entities/CarsEntity';
import UpdateCarService from '../../typeorm/services/UpdateCarService';
import UpdateCarInput from '../input/UpdateCarInput';

@Resolver()
export default class CarsResolver {
  @Authorized()
  @Mutation(() => CarsEntity)
  async updateCar(
    @Arg('data')
    {
      air_bag,
      air_conditioning,
      capacity,
      doors,
      id,
      max_speed,
    }: UpdateCarInput,
    @Ctx() ctx: UserContext,
  ): Promise<CarsEntity> {
    const updateCarService = container.resolve(UpdateCarService);
    const data = await updateCarService.execute({
      air_bag,
      air_conditioning,
      capacity,
      doors,
      id,
      max_speed,
      user_id: ctx.id,
    });

    return data;
  }
}
