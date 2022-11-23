import { gql } from '@apollo/client';

export const MUTATION_GET_TOKEN_FOR_AUTH = gql`
    mutation ($email: String!) {
        authWithEmail(email: $email)
    }
`;

export const MUTATION_REDEEM_USER_WITH_TOKEN = gql`
    mutation ($email: String!, $token: String!) {
        redeemUserMagicAuthToken(email: $email, token: $token) {
            ... on RedeemUserMagicAuthTokenSuccess {
                token
            }
            ... on RedeemUserMagicAuthTokenFailure {
                message
            }
        }
    }
`;

export const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                language
                email
                name
                role
                manager {
                    id
                    teacher
                    timeZone
                }
                client {
                    phone
                    id
                    ymClientId
                }
                avatar {
                    image {
                        url
                    }
                }
                cart {
                    id
                    amount
                    amountUSD
                    currency
                    itemsCount
                    quantityPayments
                    items {
                        id
                        subscription {
                            id
                            name
                            desc {
                                document(hydrateRelationships: true)
                            }
                        }
                        service {
                            id
                            name
                            description {
                                document(hydrateRelationships: true)
                            }
                        }
                        price
                        originalPrice
                        priceUSD
                        originalPriceUSD
                    }
                }
            }
        }
    }
`;

export const SIGN_OUT_MUTATION = gql`
    mutation {
        endSession
    }
`;
