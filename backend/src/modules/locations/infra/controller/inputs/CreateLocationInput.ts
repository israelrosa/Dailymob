import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreateLocationInput {
  @Field()
  zipCode: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  street: string;

  @Field()
  number: string;

  @Field()
  complement: string;

  @Field()
  neighborhood: string;
}
