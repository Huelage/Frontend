import { store } from '@api/app/store';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { showError } from '@utils';

const httpLink = new HttpLink({ uri: process.env.EXPO_PUBLIC_GRAPHQL_URL });
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = store.getState().global.accessToken;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      if (message === 'Unauthorized')
        console.log(`[GraphQL Error]: ${message}`);
      else {
        showError(message);
      }
    });
  }
  if (networkError) {
    console.log(`[Network Error]: ${networkError}`);
  }
});
const graphqlclient = new ApolloClient({
  link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

export default graphqlclient;
