import { gql } from "@apollo/client";

export const QUERY_MARKETING_PAGE = gql`
    query ($slug: String!) {
        marketing(where: { slug: $slug }) {
            title
            description
            aboutGeorge
            advantages
            reviews
            image {
                url
            }
            statusView
        }
    }
`;

export const QUERY_MARKETINGS = gql`
    query {
        marketings(where: { statusView: { equals: "show" } }) {
            slug
            language
        }
    }
`;
