import { gql } from '@apollo/client';

export const MUTATION_UPDATE_LESSON = gql`
    mutation ($data: LessonUpdateInput!, $id: ID!) {
        updateLesson(where: { id: $id }, data: $data) {
            id
        }
    }
`;
