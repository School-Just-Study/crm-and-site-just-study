import { gql } from '@apollo/client';

export const QUERY_STUDENT_CABINET = gql`
    query ($userId: ID!) {
        orders(where: { status: { not: { equals: finished } }, student: { id: { equals: $userId } } }) {
            id
            label
            amount
            currency
            nextPayment
            quantityPayments
            payed
            dept
        }

        nextStudentLesson(studentId: $userId)

        userSubscriptions(
            where: { student: { id: { equals: $userId } }, status: { equals: "active" } }
            orderBy: { beginDate: asc }
        ) {
            id
            name
            lastCount
            visitCount
            beginDate
            endDate
            unlimited
            lessons(where: { statusLesson: { in: ["created", "completed"] } }, orderBy: { startTime: asc }) {
                id
                title
                description
                startTime
                endTime
                trial
                statusLesson
                burned
                teachers {
                    name
                }
            }
        }
    }
`;

export const MUTATION_GET_PAY = gql`
    mutation ($orderId: String!) {
        payment(orderId: $orderId) {
            status
            redirectUrl
        }
    }
`;
