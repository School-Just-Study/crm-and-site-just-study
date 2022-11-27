import { gql } from '@apollo/client';

export const MUTATION_NEW_LEAD = gql`
    mutation MUTATION_NEW_LEAD($data: ClientCreateInput!) {
        createClient(data: $data) {
            id
        }
    }
`;
