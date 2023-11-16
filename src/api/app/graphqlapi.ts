import { store } from "@api/app/store";
import { REFRESH_ACCESS_TOKEN } from "@api/graphql";
import { clearCredentials, setCredentials } from "@api/slices/globalSlice";
import { ApolloClient, ApolloLink, InMemoryCache, Operation, fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { getItem, showError } from "@utils";
import { createUploadLink } from "apollo-upload-client";

const isRefreshing = (operation: Operation) => {
  return operation.operationName === "RefreshAccessToken";
};
const getToken = async (operation: Operation) => {
  if (isRefreshing(operation)) {
    const refreshToken = await getItem("huelageRefreshToken");
    return refreshToken;
  } else {
    return store.getState().global.accessToken;
  }
};
const getNewAccessToken = async () => {
  try {
    const { data: { refreshAccessToken: accessToken } } = await graphqlclient.mutate({ mutation: REFRESH_ACCESS_TOKEN });
    store.dispatch(setCredentials({ accessToken: accessToken as string }));
    return accessToken;
  } catch (err) {
    store.dispatch(clearCredentials());
    return Promise.reject(err);
  }
};

const httpLink = createUploadLink({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_URL,
  headers: { "Apollo-Require-Preflight": "true" }
});
const authMiddleware = new ApolloLink((operation, forward) => {
  return fromPromise(getToken(operation)).flatMap((token) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
    return forward(operation);
  });
});
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      if (message === "Unauthorized") {
        if (isRefreshing(operation)) return forward(operation);
        return fromPromise(getNewAccessToken().then(token => {
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: `Bearer ${token}`
            }
          }));
        })).flatMap(() => forward(operation));
      }
      else
        showError(message); console.log(message);
    });
  }
  if (networkError) {
    console.log(`[Network Error]: ${networkError}`);
  }
});
const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    return error.message === "Unauthorized";
  },
  delay: (count, operation, error) => {
    return count * 1000;
  }
});
const graphqlclient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, retryLink, httpLink]),
  cache: new InMemoryCache(),
});

export default graphqlclient;
