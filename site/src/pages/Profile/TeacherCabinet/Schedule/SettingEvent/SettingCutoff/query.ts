import { gql } from "@apollo/client";

export const QUERY_CUTOFF = gql`
    query ($id: ID!) {
        workTimeCutoff(where: { id: $id }) {
            id
            startTime
            endTime
            statusView
        }
    }
`;

export const UPDATE_CUTOFF = gql`
    mutation ($id: ID!, $data: WorkTimeCutoffUpdateInput!) {
        updateWorkTimeCutoff(where: { id: $id }, data: $data) {
            id
        }
    }
`;
