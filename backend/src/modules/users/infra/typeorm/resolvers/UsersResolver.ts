import IResponseToken from '@modules/users/interfaces/IResponseToken';
import UserContext from '@shared/auth/UserContext';
import { container } from 'tsyringe';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import CreateSessionToken from '../../services/CreateSessionTokenService';
import CreateUserService from '../../services/CreateUserService';
import DeleteUserService from '../../services/DeleteUserService';
import ShowAllUsersService from '../../services/ShowAllUsersService';
import UpdateUserService from '../../services/UpdateUserService';
import UserEntity from '../entities/UserEntity';
import CreateSessionInterface from '../inputs/CreateSessionInterface';
import NewUserInterface from '../inputs/NewUserInterface';
import UpdateUserInterface from '../inputs/UpdateUserInterface';

@Resolver()
export default class UsersResolver {
  @Mutation(() => UserEntity)
  async newUser(
    @Arg('data')
    {
      avatar,
      email,
      firstname,
      lastname,
      password,
      phone_number,
      username,
    }: NewUserInterface,
  ): Promise<UserEntity> {
    const createUser = container.resolve(CreateUserService);
    const data = await createUser.execute({
      avatar,
      email,
      firstname,
      lastname,
      password,
      phone_number,
      username,
    });

    return data;
  }

  @Query(() => [UserEntity])
  async users(): Promise<UserEntity[]> {
    const showAllUsers = container.resolve(ShowAllUsersService);
    const data = await showAllUsers.execute();

    return data;
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Arg('data')
    {
      avatar,
      email,
      firstname,
      id,
      lastname,
      password,
      phone_number,
      username,
    }: UpdateUserInterface,
  ): Promise<UserEntity> {
    const updateUser = container.resolve(UpdateUserService);
    const data = await updateUser.execute({
      avatar,
      email,
      firstname,
      id,
      lastname,
      password,
      phone_number,
      username,
    });

    return data;
  }

  @Mutation(() => IResponseToken)
  async createSession(
    @Arg('data')
    { email, password, phone_number, username }: CreateSessionInterface,
  ): Promise<IResponseToken> {
    const createSessionToken = container.resolve(CreateSessionToken);

    const data = await createSessionToken.execute({
      email,
      password,
      phone_number,
      username,
    });

    return data;
  }

  @Authorized()
  @Query(() => String)
  authQuery(@Ctx() ctx: UserContext): string {
    return ctx.id;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteUser(@Ctx() ctx: UserContext): Promise<boolean> {
    const deleteUser = container.resolve(DeleteUserService);
    const data = await deleteUser.execute(ctx.id);
    if (data > 0) {
      return true;
    }
    return false;
  }
}
