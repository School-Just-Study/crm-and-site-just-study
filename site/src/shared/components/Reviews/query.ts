import { gql } from '@apollo/client';

export const QUERY_REVIEWS = gql`
    query ($lang: String!) {
        productReviews(
            where: { statusView: { equals: "show" }, language: { equals: $lang } }
            orderBy: { createdAt: desc }
        ) {
            id
            desc
            createdAt
            products {
                id
            }
            student {
                name
                client {
                    profession
                }
                avatar {
                    image {
                        url
                    }
                }
            }
        }
    }
`;
