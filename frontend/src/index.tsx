import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities'
import { createConsumer } from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const cable = createConsumer(process.env.REACT_APP_GRAPHQL_ACTIONCABLE_URL)

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_PATH,
  credentials: 'include'
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  new ActionCableLink({cable}),
  httpLink
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
