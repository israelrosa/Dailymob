import RentalStatusEntity from '@modules/rentals/dependencies/rentalStatus/infra/typeorm/entities/RentalStatusEntity';
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

@ObjectType('Rental')
@Entity('rentals')
export default class RentalEntity {
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
  rental_status_id: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'lessor_id' })
  lessor: UserEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'rentaler_id' })
  rentaler: UserEntity;

  @Field(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity, { eager: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehicleEntity;

  @Field(() => RentalStatusEntity)
  @ManyToOne(() => RentalStatusEntity, { eager: true })
  @JoinColumn({ name: 'rental_status_id' })
  rental_status: RentalStatusEntity;
}
