import { gql } from '@apollo/client';

export const QUERY_DIRECTIONS_NAVBAR = gql`
    query ($lang: String!) {
        directions(where: { language: { equals: $lang }, statusView: { equals: "show" } }) {
            id
            slug
            name
        }
    }
`;
