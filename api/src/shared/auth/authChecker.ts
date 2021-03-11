import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import UserContext from './UserContext';
import authConfig from '../../config/auth';

const authChecker: AuthChecker<UserContext> = ({ context }): boolean => {
  if (!context.token) {
    throw new AuthenticationError('Está faltando o token.');
  }

  try {
    verify(context.token, authConfig.secret);
    return true;
  } catch (err) {
    throw new AuthenticationError('Token invalido.');
  }
};

export default authChecker;
