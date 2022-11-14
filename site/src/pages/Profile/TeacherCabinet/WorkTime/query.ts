import { gql } from '@apollo/client';

export const GET_WORK_TIME = gql`
    query ($id: ID!) {
        workTimes(where: { manager: { id: { equals: $id } } }, orderBy: { dayOfWeek: asc }) {
            id
            dayOfWeek
            startTime
            endTime
            isDayOff
        }
    }
`;

export const CREATE_WORK_TIME = gql`
    mutation ($data: [WorkTimeCreateInput!]!, $id: ID!, $timeZone: String!) {
        createWorkTimes(data: $data) {
            id
        }
        updateManager(where: { id: $id }, data: { timeZone: $timeZone }) {
            id
        }
    }
`;

export const UPDATE_WORK_TIME = gql`
    mutation ($data: [WorkTimeUpdateArgs!]!, $id: ID!, $timeZone: String!) {
        updateWorkTimes(data: $data) {
            id
        }
        updateManager(where: { id: $id }, data: { timeZone: $timeZone }) {
            id
        }
    }
`;
