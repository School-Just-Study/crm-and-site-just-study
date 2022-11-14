import { gql } from "@apollo/client";

export const UPDATE_LESSON = gql`
    mutation ($id: ID!, $data: LessonUpdateInput!) {
        updateLesson(where: { id: $id }, data: $data) {
            id
        }
    }
`;
