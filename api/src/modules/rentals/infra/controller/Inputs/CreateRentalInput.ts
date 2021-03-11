import { Field, InputType } from 'type-graphql';
import RentalEntity from '../../typeorm/entities/RentalEntity';

@InputType()
export default class CreateRentalInput implements Partial<RentalEntity> {
  @Field()
  initial_date: Date;

  @Field()
  return_date: Date;

  @Field()
  vehicle_id: string;
}
