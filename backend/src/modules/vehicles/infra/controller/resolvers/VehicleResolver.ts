import UserContext from '@shared/auth/UserContext';
import { container } from 'tsyringe';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import CreateVehicleService from '../../services/CreateVehicleService';
import DeleteVehicleService from '../../services/DeleteVehicleService';
import ShowVehiclesService from '../../services/ShowVehiclesService';
import UpdateVehicleService from '../../services/UpdateVehicleService';
import VehicleEntity from '../../typeorm/entities/VehicleEntity';
import CreateVehicleInput from '../inputs/CreateVehicleInput';
import UpdateVehicleInput from '../inputs/UpdateVehicleInput';

@Resolver()
export default class VehicleResolver {
  @Authorized()
  @Mutation(() => VehicleEntity)
  async newVehicle(
    @Arg('data')
    {
      brand_id,
      category_id,
      description,
      diary_value,
      model_id,
      monthly_value,
      name,
      photo,
      weekly_value,
    }: CreateVehicleInput,
    @Ctx() ctx: UserContext,
  ): Promise<VehicleEntity> {
    const createVehicle = container.resolve(CreateVehicleService);

    const data = await createVehicle.execute({
      brand_id,
      category_id,
      description,
      diary_value,
      model_id,
      monthly_value,
      name,
      photo,
      user_id: ctx.id,
      weekly_value,
    });

    return data;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteVehicle(
    @Arg('id') id: string,
    @Ctx() ctx: UserContext,
  ): Promise<boolean> {
    const deleteVehicleService = container.resolve(DeleteVehicleService);

    const data = await deleteVehicleService.execute(id, ctx.id);

    if (data > 0) {
      return true;
    }
    return false;
  }

  @Authorized()
  @Mutation(() => VehicleEntity)
  async updateVehicle(
    @Arg('data')
    {
      brand_id,
      category_id,
      description,
      weekly_value,
      diary_value,
      id,
      model_id,
      monthly_value,
      name,
      photo,
    }: UpdateVehicleInput,
    @Ctx() ctx: UserContext,
  ): Promise<VehicleEntity> {
    const updateVehicleService = container.resolve(UpdateVehicleService);

    const data = await updateVehicleService.execute({
      brand_id,
      category_id,
      description,
      diary_value,
      id,
      model_id,
      monthly_value,
      name,
      photo,
      user_id: ctx.id,
      weekly_value,
    });

    return data;
  }

  @Query(() => [VehicleEntity])
  async vehicles(): Promise<VehicleEntity[]> {
    const showVehicles = container.resolve(ShowVehiclesService);

    const data = await showVehicles.execute();

    return data;
  }
}
