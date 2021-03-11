import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import CreateLocationService from './CreateLocationService';
import FakeLocationsRepository from '../typeorm/repositories/fake/FakeLocationsRepository';

describe('CreateLocation', () => {
  let locationsRepository: ILocationsRepository;

  let createLocationService: CreateLocationService;

  beforeEach(() => {
    locationsRepository = new FakeLocationsRepository();

    createLocationService = new CreateLocationService(locationsRepository);
  });

  it('should be able to create a location.', async () => {
    expect(
      await createLocationService.execute({
        city: 'Tubarão',
        complement: 'Aodsf',
        neighborhood: 'Centro',
        number: '448',
        state: 'SC',
        street: 'Sdkadks',
        user_id: 'fdiusapç',
        zipCode: '88701622',
      }),
    ).toHaveProperty('id');
  });
});
