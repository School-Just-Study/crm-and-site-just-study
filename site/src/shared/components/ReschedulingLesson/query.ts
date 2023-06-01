import { gql } from '@apollo/client';

export const MUTATION_UPDATE_LESSON = gql`
    mutation ($data: LessonUpdateInput!, $id: ID!) {
        updateLesson(where: { id: $id }, data: $data) {
            id
        }
    }
`;

export const MUTATION_UPDATE_LESSON_FOR_PLAN = gql`
    mutation ($data: LessonCreateInput!, $id: ID!) {
        createLesson(data: $data) {
            id
        }
        updateLesson(where: { id: $id }, data: { statusLesson: "canceled", notAlert: false }) {
            id
        }
    }
`;

export const QUERY_LESSON = gql`
    query ($id: ID!) {
        lesson(where: { id: $id }) {
            id
            notAlert
            students {
                id
            }
            teachers {
                id
                name
                timeZone
                workTime {
                    dayOfWeek
                    isDayOff
                    startTime
                    endTime
                }
            }
        }
    }
`;
