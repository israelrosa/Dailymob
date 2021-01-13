import { Field, InputType } from 'type-graphql';
import RentEntity from '../../typeorm/entities/RentEntity';

@InputType()
export default class UpdateRentInput implements Partial<RentEntity> {
  @Field()
  id: string;

  @Field()
  initial_date: Date;

  @Field()
  return_date: Date;

  @Field()
  vehicle_id: string;

  @Field()
  pickup_location_id: string;

  @Field()
  return_location_id: string;

  @Field()
  rent_type_id: string;
}
