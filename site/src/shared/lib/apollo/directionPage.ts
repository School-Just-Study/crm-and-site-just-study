import gql from 'graphql-tag';

export const QUERY_DIRECTION_PAGE = gql`
    query ($lang: String!, $slug: String!) {
        directions(
            where: { language: { equals: $lang }, slug: { equals: $slug }, statusView: { equals: "show" } }
            take: 1
        ) {
            id
            name
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
                description
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

export const QUERY_ALL_DIRECTIONS = gql`
    query {
        directions(where: { statusView: { equals: "show" } }) {
            slug
            language
        }
    }
`;
