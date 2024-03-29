import { gql } from '@apollo/client';

export const QUERY_BLOG_PAGE = gql`
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
                image {
                    url
                    width
                    height
                }
            }
        }
        tags(where: { language: { equals: $lang } }) {
            name
            id
        }
    }
`;
