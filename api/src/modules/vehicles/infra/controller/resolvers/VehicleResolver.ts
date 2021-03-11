import CreateCarInput from '@modules/vehicles/dependencies/cars/infra/controller/input/CreateCarInput';
import CreateCarService from '@modules/vehicles/dependencies/cars/infra/services/CreateCarService';
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
  async newCar(
    @Arg('vehicle')
    {
      brand,
      category_id,
      description,
      diary_value,
      model,
      monthly_value,
      name,
      photo,
      weekly_value,
      location_id,
      waiting_time,
    }: CreateVehicleInput,
    @Arg('car')
    { air_bag, air_conditioning, capacity, doors, max_speed }: CreateCarInput,
    @Ctx() ctx: UserContext,
  ): Promise<VehicleEntity> {
    const createVehicle = container.resolve(CreateVehicleService);
    const createCar = container.resolve(CreateCarService);

    const dataVehicle = await createVehicle.execute({
      brand,
      category_id,
      description,
      location_id,
      diary_value,
      model,
      monthly_value,
      name,
      photo,
      user_id: ctx.id,
      weekly_value,
      waiting_time,
    });

    const dataCar = await createCar.execute({
      air_bag,
      air_conditioning,
      capacity,
      doors,
      max_speed,
      vehicle_id: dataVehicle.id,
    });

    dataVehicle.car = dataCar;

    return dataVehicle;
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
      brand,
      category_id,
      description,
      weekly_value,
      diary_value,
      id,
      model,
      monthly_value,
      name,
      photo,
      location_id,
      waiting_time,
    }: UpdateVehicleInput,
    @Ctx() ctx: UserContext,
  ): Promise<VehicleEntity> {
    const updateVehicleService = container.resolve(UpdateVehicleService);

    const data = await updateVehicleService.execute({
      brand,
      category_id,
      description,
      diary_value,
      location_id,
      id,
      model,
      monthly_value,
      name,
      photo,
      user_id: ctx.id,
      weekly_value,
      waiting_time,
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
