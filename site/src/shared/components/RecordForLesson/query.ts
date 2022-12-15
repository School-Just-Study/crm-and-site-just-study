import { gql } from '@apollo/client';

export const MUTATION_CREATE_LESSON = gql`
    mutation ($data: LessonCreateInput!) {
        createLesson(data: $data) {
            id
        }
    }
`;

export const QUERY_SUBSCRIPTION_ACTIVE = gql`
    query ($userId: ID!) {
        userSubscriptions(
            where: { student: { id: { equals: $userId } }, status: { equals: "active" } }
            orderBy: { beginDate: asc }
            take: 1
        ) {
            id
            beginDate
            durationLessons
        }
    }
`;
