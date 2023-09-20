import { store } from '@api/app/store';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({ uri: process.env.EXPO_PUBLIC_GRAPHQL_URL });
const authMiddleware = new ApolloLink((operation, forward) => {
	const token = store.getState().global;
	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : ''
		}
	});
	return forward(operation);
});
const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message }) => {
			console.log(message);
		});
	}
});
const graphqlclient = new ApolloClient({
	link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
	cache: new InMemoryCache(),
});

export default graphqlclient;