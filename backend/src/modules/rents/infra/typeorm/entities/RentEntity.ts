import LocationEntity from '@modules/locations/infra/typeorm/entities/LocationEntity';
import RentTypeEntity from '@modules/rents/dependencies/rentTypes/infra/typeorm/entities/RentTypeEntity';
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
  @Column()
  user_id: string;

  @Field()
  @Column()
  vehicle_id: string;

  @Field()
  @Column()
  pickup_location_id: string;

  @Field()
  @Column()
  return_location_id: string;

  @Field()
  @Column()
  rent_type_id: string;

  @Field()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Field()
  @ManyToOne(() => VehicleEntity)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehicleEntity;

  @Field()
  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'pickup_location_id' })
  pickup_location: LocationEntity;

  @Field()
  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'return_location_id' })
  return_location: LocationEntity;

  @Field()
  @ManyToOne(() => RentTypeEntity)
  @JoinColumn({ name: 'rent_type_id' })
  rent_type: RentTypeEntity;
}
