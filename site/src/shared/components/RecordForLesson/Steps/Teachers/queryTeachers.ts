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
        users(where: { manager: { teacher: { equals: true } } }) {
            manager {
                id
            }
            avatar {
                image {
                    url
                }
            }
        }
    }
`;
