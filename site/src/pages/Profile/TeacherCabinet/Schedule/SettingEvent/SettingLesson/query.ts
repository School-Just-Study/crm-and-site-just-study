import { gql } from '@apollo/client';

export const QUERY_LESSON = gql`
    query ($id: ID!) {
        lesson(where: { id: $id }) {
            id
            startTime
            endTime
            title
            description
            burned
            subscriptions {
                id
                name
                status
                lastCount
                unlimited
                student {
                    id
                }
            }
            statusLesson
            students {
                id
                name
                client {
                    goal
                    profession
                }
                avatar {
                    image {
                        url
                    }
                }
            }
        }
    }
`;
