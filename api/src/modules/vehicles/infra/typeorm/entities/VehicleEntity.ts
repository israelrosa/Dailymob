import LocationEntity from '@modules/locations/infra/typeorm/entities/LocationEntity';
import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import BrandEntity from '@modules/vehicles/dependencies/brands/infra/typeorm/entities/BrandEntity';
import CarsEntity from '@modules/vehicles/dependencies/cars/infra/typeorm/entities/CarsEntity';
import CategoryEntity from '@modules/vehicles/dependencies/categories/infra/typeorm/entities/CategoryEntity';
import ModelEntity from '@modules/vehicles/dependencies/models/infra/typeorm/entities/ModelEntity';
import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType('Vehicle')
@Entity('vehicles')
export default class VehicleEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string;

  @Field()
  @Column()
  diary_value: number;

  @Field()
  @Column()
  weekly_value: number;

  @Field()
  @Column()
  monthly_value: number;

  @Field()
  @Column()
  waiting_time: number;

  @Field()
  @Column()
  category_id: string;

  @Field()
  @Column()
  brand_id: string;

  @Field()
  @Column()
  model_id: string;

  @Field()
  @Column()
  user_id: string;

  @Field()
  @Column()
  location_id: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @Field(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Field(() => BrandEntity)
  @ManyToOne(() => BrandEntity)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @Field(() => ModelEntity)
  @ManyToOne(() => ModelEntity)
  @JoinColumn({ name: 'model_id' })
  model: ModelEntity;

  @Field(() => CarsEntity)
  @OneToOne(() => CarsEntity, car => car.vehicle, { onDelete: 'CASCADE' })
  car: CarsEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
