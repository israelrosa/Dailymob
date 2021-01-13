import VehicleEntity from '@modules/vehicles/infra/typeorm/entities/VehicleEntity';
import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType('Car')
@Entity('cars')
export default class CarsEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('integer')
  doors: number;

  @Field()
  @Column('boolean')
  air_conditioning: boolean;

  @Field()
  @Column('float')
  max_speed: number;

  @Field()
  @Column('boolean')
  air_bag: boolean;

  @Field()
  @Column('integer')
  capacity: number;

  @Field()
  @Column()
  vehicle_id: string;

  @Field()
  @OneToOne(() => VehicleEntity)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehicleEntity;
}
