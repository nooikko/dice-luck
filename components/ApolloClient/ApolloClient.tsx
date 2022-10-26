import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { PropsWithChildren } from 'react';

const httpLink = createHttpLink({
  uri: '/api/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  if (localStorage) {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }

  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: 'Baseline Client',
  version: '1',
  ssrMode: true,
});

export const WithApollo: React.FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
