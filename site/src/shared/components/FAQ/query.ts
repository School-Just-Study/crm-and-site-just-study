import { gql } from '@apollo/client';

export const QUERY_FAQS = gql`
    query ($locale: String!) {
        faqs(where: { statusView: { equals: "show" }, language: { equals: $locale } }) {
            id
            title
            desc
        }
    }
`;
