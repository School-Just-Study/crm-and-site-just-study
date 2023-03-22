import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { BACKEND_URL_GRAPHQL } from '../../../../config';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const cache = new InMemoryCache();

function createApolloClient() {
    return new ApolloClient({
        uri: BACKEND_URL_GRAPHQL,
        cache,
        ssrMode: typeof window === 'undefined',
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network'
            }
        }
    });
}

export function initializeApollo(initialState: NormalizedCacheObject | undefined) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    if (typeof window === 'undefined') return _apolloClient;

    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | undefined) {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}

const client = initializeApollo(undefined);

export default client;
