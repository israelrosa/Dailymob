import { ApolloClient, InMemoryCache } from '@apollo/client';

const api = new ApolloClient({
  uri: 'localhost:3333/graphql',
  cache: new InMemoryCache(),
});

export default api;
