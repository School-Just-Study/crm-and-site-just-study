import { gql } from '@apollo/client';

export const QUERY_DIRECTIONS = gql`
    query ($lang: String!) {
        directions(where: { language: { equals: $lang }, statusView: { equals: "show" } }) {
            id
            name
            slug
            description
            image {
                url
            }
            goals {
                id
                name
                image {
                    url
                }
            }
            results {
                id
                name
            }
            products {
                id
                name
                desc {
                    document(hydrateRelationships: true)
                }
                category {
                    id
                    name
                }
                image {
                    url
                }
                tags {
                    id
                    name
                }
                subscriptions {
                    id
                }
            }
        }
    }
`;
