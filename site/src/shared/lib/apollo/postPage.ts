import { gql } from '@apollo/client';

export const QUERY_POST = gql`
    query ($id: ID!) {
        post(where: { id: $id }) {
            id
            title
            language
            description
            cover {
                image {
                    url
                    width
                    height
                }
            }
            content {
                document(hydrateRelationships: true)
            }
            author {
                name
            }
            createdAt
            tag {
                name
            }
        }
    }
`;

export const QUERY_ALL_POST = gql`
    query {
        posts(where: { statusView: { equals: "show" } }) {
            id
            language
        }
    }
`;
