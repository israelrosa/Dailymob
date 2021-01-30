import { Field, InputType } from 'type-graphql';
import CarsEntity from '../../typeorm/entities/CarsEntity';

@InputType()
export default class CreateCarInput implements Partial<CarsEntity> {
  @Field()
  doors: number;

  @Field()
  air_conditioning: boolean;

  @Field()
  max_speed: number;

  @Field()
  air_bag: boolean;

  @Field()
  capacity: number;
}
