import { gql } from "@apollo/client";

export const CANCEL_LESSON = gql`
    mutation ($id: ID) {
        updateLesson(where: { id: $id }, data: { statusLesson: "canceled" }) {
            id
        }
    }
`;
