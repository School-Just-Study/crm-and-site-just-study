import { gql } from '@apollo/client';

export const QUERY_FAQS = gql`
    query ($lang: String!) {
        faqs(where: { statusView: { equals: "show" }, language: { equals: $lang } }) {
            id
            title
            desc
        }
    }
`;
