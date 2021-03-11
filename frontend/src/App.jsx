import React from 'react';
import { View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import api from './services/api';

const App = () => {
  return (
    <ApolloProvider client={api}>
      <View />
    </ApolloProvider>
  );
};
export default App;
