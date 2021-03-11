import ILocationsRepository from '@modules/locations/interfaces/ILocationsRepository';
import AppError from '@shared/error/AppError';
import FakeLocationsRepository from '../typeorm/repositories/fake/FakeLocationsRepository';
import DeleteLocationService from './DeleteLocationService';

describe('DeleteLocation', () => {
  let locationsRepository: ILocationsRepository;

  let deleteLocation: DeleteLocationService;

  beforeEach(() => {
    locationsRepository = new FakeLocationsRepository();

    deleteLocation = new DeleteLocationService(locationsRepository);
  });

  it('should be able to delete a location', async () => {
    const location = await locationsRepository.create({
      city: 'Tubarão',
      complement: 'Aodsf',
      neighborhood: 'Centro',
      number: '448',
      state: 'SC',
      street: 'Sdkadks',
      user_id: 'fdiusapç',
      zipCode: '88701622',
    });

    expect(await deleteLocation.execute(location.id, 'fdiusapç')).toBe(1);
  });

  it('should not be able to delete a location if it does not exist', async () => {
    await expect(
      deleteLocation.execute('jkdjsiojg', 'pjdjfsipohj'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a location if the user does not have permission', async () => {
    const location = await locationsRepository.create({
      city: 'Tubarão',
      complement: 'Aodsf',
      neighborhood: 'Centro',
      number: '448',
      state: 'SC',
      street: 'Sdkadks',
      user_id: 'fdiusapç',
      zipCode: '88701622',
    });

    await expect(
      deleteLocation.execute(location.id, 'kfjdspau'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
