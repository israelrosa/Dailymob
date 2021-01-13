import { ApolloError } from 'apollo-server-express';

class AppError extends ApolloError {
  public readonly message: string;

  public readonly statusCode: string;

  constructor(message: string, statusCode = 'BAD_REQUEST') {
    super(message, statusCode);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
