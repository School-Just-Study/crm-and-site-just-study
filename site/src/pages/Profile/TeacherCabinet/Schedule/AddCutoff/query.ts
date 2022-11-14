import { gql } from "@apollo/client";

export const CREATE_CUTOFF = gql`
    mutation ($data: WorkTimeCutoffCreateInput!) {
        createWorkTimeCutoff(data: $data) {
            id
        }
    }
`;
