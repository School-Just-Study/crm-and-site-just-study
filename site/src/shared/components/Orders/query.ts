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
            leftPayments
            payed
            dept
            amountUSD
            nextPaymentUSD
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
            lessons(where: { statusLesson: { in: ["created", "completed"] } }, orderBy: { startTime: desc }) {
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
    mutation ($orderId: String!, $currency: String) {
        payment(orderId: $orderId, currency: $currency) {
            status
            redirectUrl
        }
    }
`;
