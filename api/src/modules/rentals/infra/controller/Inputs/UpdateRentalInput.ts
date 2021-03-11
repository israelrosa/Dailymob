import { Field, InputType } from 'type-graphql';
import RentalEntity from '../../typeorm/entities/RentalEntity';

@InputType()
export default class UpdateRentalInput implements Partial<RentalEntity> {
  @Field()
  id: string;

  @Field()
  initial_date: Date;

  @Field()
  return_date: Date;

  @Field()
  rental_status_id: string;
}
