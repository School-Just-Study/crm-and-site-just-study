import { gql } from '@apollo/client';

export const QUERY_COURSE = gql`
    query ($id: ID!) {
        product(where: { id: $id }) {
            id
            name
            language
            description
            desc {
                document(hydrateRelationships: true)
            }
            tags {
                name
                id
            }
            subscriptions {
                id
                name
                price
                trial
            }
        }
    }
`;

export const QUERY_COURSES = gql`
    query {
        products(where: { statusView: { equals: "show" } }) {
            id
            language
            name
        }
    }
`;
