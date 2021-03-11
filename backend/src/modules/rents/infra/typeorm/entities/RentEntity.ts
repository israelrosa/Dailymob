import RentStatusEntity from '@modules/rents/dependencies/rentStatus/infra/typeorm/entities/RentStatusEntity';
import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import VehicleEntity from '@modules/vehicles/infra/typeorm/entities/VehicleEntity';
import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType('Rent')
@Entity('rents')
export default class RentEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  initial_date: Date;

  @Field()
  @Column()
  return_date: Date;

  @Field()
  @Column({ nullable: true })
  devolution_date: Date;

  @Field()
  @Column()
  lessor_id: string;

  @Field()
  @Column()
  renter_id: string;

  @Field()
  @Column()
  vehicle_id: string;

  @Field()
  @Column()
  rent_status_id: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'lessor_id' })
  lessor: UserEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'renter_id' })
  renter: UserEntity;

  @Field(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity, { eager: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehicleEntity;

  @Field(() => RentStatusEntity)
  @ManyToOne(() => RentStatusEntity, { eager: true })
  @JoinColumn({ name: 'rent_status_id' })
  rent_status: RentStatusEntity;
}
