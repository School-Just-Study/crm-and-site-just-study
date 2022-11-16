import { gql } from '@apollo/client';

export const MUTATION_CART = gql`
    mutation MUTATION_CART($data: CartData!) {
        cart(data: $data) {
            status
            redirectUrl
        }
    }
`;

export const MUTATION_AUTH_FOR_CART = gql`
    mutation MUTATION_CART($data: AuthCartData!) {
        authCart(data: $data) {
            id
            email
        }
    }
`;

export const MUTATION_CREATE_CART_ITEMS = gql`
    mutation ($data: [CartItemCreateInput!]!) {
        createCartItems(data: $data) {
            id
        }
    }
`;
