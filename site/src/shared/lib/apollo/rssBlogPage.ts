import { gql } from '@apollo/client';

export const QUERY_BLOG_PAGE_FOR_RSS = gql`
    query ($lang: String!) {
        posts(where: { statusView: { equals: "show" }, language: { equals: $lang } }, orderBy: { createdAt: desc }) {
            id
            title
            description
            createdAt
            author {
                name
            }
            content {
                document(hydrateRelationships: true)
            }
            cover {
                url
                width
                height
            }
        }
        tags(where: { language: { equals: $lang } }) {
            name
            id
        }
    }
`;
