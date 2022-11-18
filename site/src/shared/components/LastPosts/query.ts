import { gql } from '@apollo/client';

export const QUERY_LAST_POSTS = gql`
    query ($lang: String!) {
        posts(
            where: { statusView: { equals: "show" }, language: { equals: $lang } }
            orderBy: { createdAt: desc }
            take: 4
        ) {
            id
            title
            cover {
                image {
                    url
                    width
                    height
                }
            }
        }
    }
`;
