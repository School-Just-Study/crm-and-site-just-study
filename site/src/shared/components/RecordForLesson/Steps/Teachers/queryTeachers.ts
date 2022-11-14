import { gql } from '@apollo/client';

export const TEACHERS_QUERY = gql`
    query {
        managers(where: { teacher: { equals: true }, work: { equals: true } }) {
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
`;
