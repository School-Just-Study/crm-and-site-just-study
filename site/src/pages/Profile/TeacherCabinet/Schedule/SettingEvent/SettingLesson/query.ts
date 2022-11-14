import { gql } from "@apollo/client";

export const QUERY_LESSON = gql`
    query ($id: ID!) {
        lesson(where: { id: $id }) {
            id
            startTime
            endTime
            title
            description
            burned
            subscription {
                id
                name
                status
                lastCount
                student {
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
            statusLesson
            students {
                name
            }
        }
    }
`;
