import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType('Location')
@Entity('locations')
export default class LocationEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  zipCode: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  number: string;

  @Field()
  @Column()
  complement: string;

  @Field()
  @Column()
  neighborhood: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field()
  @Column()
  user_id: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
