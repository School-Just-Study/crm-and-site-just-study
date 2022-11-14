import { gql } from '@apollo/client';

export const QUERY_GET_UNAVAILABLE_TIMES = gql`
    query ($data: UnavailableTimesForRecordLessonData!) {
        unavailableTimesForRecordLesson(data: $data) {
            startTime
            endTime
        }
    }
`;
