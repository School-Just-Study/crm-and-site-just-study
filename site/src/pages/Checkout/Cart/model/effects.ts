import { createEffect } from 'effector';
import { IAuthCartData } from '@src/pages/Checkout/Cart/MakingOrder/types';
import client from '@shared/lib/apollo/apolloClient';
import { FetchResult } from '@apollo/client';
import { MUTATION_AUTH_FOR_CART, MUTATION_CREATE_CART_ITEMS } from '@src/pages/Checkout/Cart/graphql';
import { ApolloError } from '@apollo/client/errors';
import { CartItem, CartItemCreateInput } from '@shared/lib/apollo/types';

export interface AuthForCartProps {
    authCart: {
        email: string;
    };
}

export const authForCartFx = createEffect<IAuthCartData, FetchResult<AuthForCartProps>, ApolloError>(async (data) => {
    return await client.mutate<AuthForCartProps>({
        mutation: MUTATION_AUTH_FOR_CART,
        variables: { data }
    });
});

export const updateUserCartFx = createEffect<CartItemCreateInput[], FetchResult<CartItem[]>, ApolloError>(
    async (data) => {
        return await client.mutate({
            mutation: MUTATION_CREATE_CART_ITEMS,
            variables: { data }
        });
    }
);
