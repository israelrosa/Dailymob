import { Field, ObjectType } from 'type-graphql';
import UserEntity from '../infra/typeorm/entities/UserEntity';

@ObjectType({})
export default class IResponseToken {
  @Field()
  user: UserEntity;

  @Field()
  token: string;
}
