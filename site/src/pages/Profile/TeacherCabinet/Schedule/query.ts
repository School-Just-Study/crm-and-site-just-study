import { gql } from '@apollo/client';

export const QUERY_TEACHER = gql`
    query ($id: ID!) {
        manager(where: { id: $id }) {
            id
            name
            timeZone
            linkOnlineLesson
            workTime {
                dayOfWeek
                isDayOff
                startTime
                endTime
            }
        }
    }
`;

export const QUERY_SCHEDULE = gql`
    query ($data: GetTeacherScheduleData!) {
        getTeacherSchedule(data: $data) {
            lessons
            cutoff
        }
    }
`;
