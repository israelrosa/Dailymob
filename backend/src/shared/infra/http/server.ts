import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import path from 'path';
import { createConnection } from 'typeorm';
import '../../containers';
import authChecker from '@shared/auth/authChecker';
import UserContext from '@shared/auth/UserContext';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

(async () => {
  await createConnection().then(() =>
    console.log('Sucess to connect the database!'),
  );
  const schema = await buildSchema({
    resolvers: [
      path.resolve(
        __dirname,
        '../../../modules/**/**/infra/typeorm/resolvers/*.ts',
      ),
    ],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: (ctx): UserContext => {
      const headerToken = ctx.req.headers.authorization;

      if (headerToken) {
        const [, token] = headerToken.split(' ');
        const decoded = verify(token, authConfig.secret);
        const { sub } = decoded as ITokenPayload;
        return { id: sub, token };
      }
      return { id: '', token: '' };
    },
    playground: true,
  });

  const app = express();

  server.applyMiddleware({ app });

  app.listen(3333, () => {
    console.log(`Server ready at http://localhost:3333${server.graphqlPath}`);
  });
})();
