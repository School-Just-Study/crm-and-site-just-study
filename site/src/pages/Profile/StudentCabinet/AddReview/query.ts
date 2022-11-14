import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
    mutation ($data: ProductReviewCreateInput!) {
        createProductReview(data: $data) {
            id
        }
    }
`;
