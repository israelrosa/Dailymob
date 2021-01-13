import { Field, InputType } from 'type-graphql';
import UserEntity from '../../typeorm/entities/UserEntity';

@InputType()
export default class UpdateUserInterface implements Partial<UserEntity> {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  phone_number: string;

  @Field()
  avatar: string;
}
