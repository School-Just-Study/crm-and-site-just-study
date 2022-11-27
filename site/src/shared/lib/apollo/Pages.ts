import { gql } from '@apollo/client';

export const QUERY_PAGE_PATHS = gql`
    query {
        pages(where: { statusView: { equals: "show" } }) {
            language
            slug
        }
    }
`;

export const QUERY_PAGE = gql`
    query ($slug: String!, $lang: String!) {
        pages(where: { statusView: { equals: "show" }, slug: { equals: $slug }, language: { equals: $lang } }) {
            id
            language
            title
            description
            content {
                document(hydrateRelationships: true)
            }
        }
    }
`;
