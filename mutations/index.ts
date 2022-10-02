import { ExtendGraphqlSchema } from "@keystone-6/core/dist/declarations/src/types/config";
import { graphQLSchemaExtension } from "@keystone-6/core";
import { authWithEmail } from "./authWithEmail";
import { checkout } from "./checkout";
import { payment } from "./payment";
import { checkPayment } from "./checkPayment";
import { cart } from "./cart";
import { authCart } from "./authCart";
import { unavailableTimesForRecordLesson } from "./unavailableTimesForRecordLesson";

export const graphql = String.raw;
export const extendGraphqlSchema: ExtendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type PaymentResponse {
      status: Boolean!
      redirectUrl: String!
    }

    input CartData {
      firstName: String!
      secondName: String!
      phone: Decimal!
      email: String!
      currency: String!
      language: String!
    }

    input AuthCartData {
      firstName: String!
      secondName: String!
      phone: Decimal!
      email: String!
      language: String
    }

    input UnavailableTimesForRecordLessonData {
      date: String!
      teacherId: ID!
    }
    type UnavailableTimesForRecordLessonResponse {
      startTime: String!
      endTime: String!
    }

    type Mutation {
      authWithEmail(email: String!): String
      checkout(userId: String!, currency: String!): PaymentResponse
      payment(orderId: String!): PaymentResponse
      cart(data: CartData!): PaymentResponse
      authCart(data: AuthCartData!): Client
    }

    type Query {
      checkPayment(paymentId: String!): Payment
      unavailableTimesForRecordLesson(
        data: UnavailableTimesForRecordLessonData!
      ): [UnavailableTimesForRecordLessonResponse]
    }
  `,
  resolvers: {
    Mutation: {
      authWithEmail,
      checkout,
      payment,
      cart,
      authCart,
    },
    Query: {
      checkPayment,
      unavailableTimesForRecordLesson,
    },
  },
});
