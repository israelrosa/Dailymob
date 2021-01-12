import { Field, InputType } from 'type-graphql';
import UserEntity from '../entities/UserEntity';

@InputType()
export default class CreateSessionInterface implements Partial<UserEntity> {
  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phone_number: string;

  @Field()
  password: string;
}
