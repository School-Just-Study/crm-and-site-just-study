import { gql } from '@apollo/client';

export const FIND_IMAGE = gql`
    query ($id: ID!) {
        image(where: { id: $id }) {
            id
            image {
                url
            }
        }
    }
`;
