import { Field, InputType } from 'type-graphql';
import RentEntity from '../../typeorm/entities/RentEntity';

@InputType()
export default class CreateRentInput implements Partial<RentEntity> {
  @Field()
  initial_date: Date;

  @Field()
  return_date: Date;

  @Field()
  vehicle_id: string;
}
