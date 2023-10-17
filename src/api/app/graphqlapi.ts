import { store } from '@api/app/store';
import { REFRESH_ACCESS_TOKEN } from '@api/graphql';
import { setCredentials } from '@api/slices/globalSlice';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getItem, showError } from '@utils';

const getNewAccessToken = async () => {
  try {
    console.log('Refreshing access token');
    const { data: { refreshAccessToken } } = await graphqlclient.mutate({ mutation: REFRESH_ACCESS_TOKEN, fetchPolicy: 'network-only' });
    console.log({ refreshAccessToken });
    store.dispatch(setCredentials({ accessToken: refreshAccessToken }));
    return refreshAccessToken;
  } catch (err) {
    console.log("There was an error refreshing the access token");
    console.log(err);
  }
};

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
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.map(async ({ message }) => {
      if (message === 'Unauthorized') {
        console.log(`[GraphQL Error]: ${message}`);
        const refreshToken = await getItem("huelageRefreshToken");
        console.log({ refreshToken });
        const oldHeaders = operation.getContext().headers;
        operation.setContext({
          headers: {
            authorization: `Bearer ${refreshToken}`
          }
        });
        await getNewAccessToken();
        const token = store.getState().global.accessToken;
        console.log({ token });
        operation.setContext({
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        });
        console.log(`[GraphQL Error]: ${message}`);
        return forward(operation);
      }
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
