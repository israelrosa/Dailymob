import { getRepository, Repository } from 'typeorm';
import ICarsRepository, {
  ICreateCar,
} from '../../../interfaces/ICarsRepository';
import CarsEntity from '../entities/CarsEntity';

export default class CarsRepository implements ICarsRepository {
  ormRepository: Repository<CarsEntity>;

  constructor() {
    this.ormRepository = getRepository(CarsEntity);
  }

  async create({
    air_bag,
    air_conditioning,
    capacity,
    doors,
    max_speed,
    vehicle_id,
  }: ICreateCar): Promise<CarsEntity> {
    const data = await this.ormRepository.create({
      air_bag,
      air_conditioning,
      capacity,
      doors,
      max_speed,
      vehicle_id,
    });

    const result = await this.ormRepository.save(data);

    return result;
  }

  // async delete(id: string): Promise<number | null | undefined> {
  //   const data = await this.ormRepository.delete(id);

  //   return data.affected;
  // }

  // async findAll(): Promise<CarsEntity[]> {
  //   const data = await this.ormRepository.find();

  //   return data;
  // }

  async findById(id: string): Promise<CarsEntity | undefined> {
    const data = await this.ormRepository.findOne(id, {
      relations: ['vehicle'],
    });

    return data;
  }

  async update(cars: CarsEntity): Promise<CarsEntity> {
    const data = await this.ormRepository.save(cars);

    return data;
  }
}
