import { Field, InputType } from 'type-graphql';

@InputType()
export default class UpdateCarInput {
  @Field()
  id: string;

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
