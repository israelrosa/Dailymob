import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../typeorm/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  let usersRepository: IUsersRepository;

  let hashProvider: IHashProvider;

  let createUser: CreateUserService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();

    hashProvider = new FakeHashProvider();

    createUser = new CreateUserService(usersRepository, hashProvider);
  });

  it('should be able to create an user', async () => {
    const passwordSpy = jest.spyOn(hashProvider, 'generateHash');

    expect(
      await createUser.execute({
        avatar: 'fskdajfsdk',
        email: 'fjdsaufpsad',
        firstname: 'ijfasjfsad',
        lastname: 'fdsauipufas',
        password: 'fsapufsa',
        phone_number: 'fdsaufpaisdjç',
        username: 'fdskiaifdj',
      }),
    ).toHaveProperty('id');

    expect(passwordSpy).toHaveBeenCalledWith('fsapufsa');
  });
});
