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
  rent_status_id: string;
}
