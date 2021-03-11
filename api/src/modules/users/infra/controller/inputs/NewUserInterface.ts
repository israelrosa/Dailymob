import { Field, InputType } from 'type-graphql';
import UserEntity from '../../typeorm/entities/UserEntity';

@InputType()
export default class NewUserInterface implements Partial<UserEntity> {
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

  @Field({ nullable: true })
  avatar: string;
}
