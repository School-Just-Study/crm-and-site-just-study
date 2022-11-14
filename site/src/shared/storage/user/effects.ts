import { createEffect } from 'effector';
import client from '@src/shared/lib/apollo/apolloClient';
import {
    CURRENT_USER_QUERY,
    MUTATION_GET_TOKEN_FOR_AUTH,
    MUTATION_REDEEM_USER_WITH_TOKEN,
    SIGN_OUT_MUTATION
} from '@shared/storage/user/query';
import { ApolloError } from '@apollo/client/errors';
import { FetchResult } from '@apollo/client';
import { RedeemUserMagicAuthTokenFailure, RedeemUserMagicAuthTokenSuccess, User } from '@src/shared/lib/apollo/types';

export interface GetAuthTokenWithEmailResponse {
    authWithEmail: string;
}

export const getAuthTokenWithEmailFx = createEffect<string, FetchResult<GetAuthTokenWithEmailResponse>, ApolloError>(
    async (email) => {
        return await client.mutate<GetAuthTokenWithEmailResponse>({
            mutation: MUTATION_GET_TOKEN_FOR_AUTH,
            variables: { email }
        });
    }
);

export interface AuthWithTokenProps extends GetAuthTokenWithEmailResponse {
    email: string;
}

export const authWithTokenFx = createEffect<
    AuthWithTokenProps,
    FetchResult<RedeemUserMagicAuthTokenSuccess | RedeemUserMagicAuthTokenFailure>,
    ApolloError
>(async ({ authWithEmail, email }) => {
    return await client.mutate<RedeemUserMagicAuthTokenSuccess | RedeemUserMagicAuthTokenFailure>({
        mutation: MUTATION_REDEEM_USER_WITH_TOKEN,
        variables: { email, token: authWithEmail }
    });
});

export const getUserFx = createEffect<void, FetchResult<{ authenticatedItem: User }>, ApolloError>(async () => {
    return await client.query<{ authenticatedItem: User }>({ query: CURRENT_USER_QUERY, fetchPolicy: 'network-only' });
});

export const logOutFx = createEffect<void, FetchResult, ApolloError>(async () => {
    return await client.mutate({ mutation: SIGN_OUT_MUTATION });
});
