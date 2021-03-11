import ICarsRepository from '../../interfaces/ICarsRepository';
import FakeCarsRepository from '../typeorm/repositories/fake/FakeCarsRepository';
import CreateCarService from './CreateCarService';

describe('CreateCar', () => {
  let carsRepository: ICarsRepository;

  let createCar: CreateCarService;

  beforeEach(() => {
    carsRepository = new FakeCarsRepository();

    createCar = new CreateCarService(carsRepository);
  });

  it('should be able to create a car', async () => {
    expect(
      await createCar.execute({
        air_bag: true,
        air_conditioning: true,
        capacity: 4,
        doors: 4,
        max_speed: 120,
        vehicle_id: 'jfdpsaji',
      }),
    ).toHaveProperty('id');
  });
});
