import { ExtendGraphqlSchema } from "@keystone-6/core/dist/declarations/src/types/config";
import { graphQLSchemaExtension } from "@keystone-6/core";
import { authWithEmail } from "./authWithEmail";
import { checkout } from "./checkout";
import { payment } from "./payment";

export const graphql = String.raw;
export const extendGraphqlSchema: ExtendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Checkout {
      Success: String!
      OrderId: String
      ErrCode: String
      RedirectUrl: String!
      Amount: String
      SessionLifeTime: String
      AttemptsCount: String
      SessionId: String
    }

    type Mutation {
      authWithEmail(email: String!): String
      checkout(userId: String!): Checkout
      payment(orderId: String!): Checkout
    }
  `,
  resolvers: {
    Mutation: {
      authWithEmail,
      checkout,
      payment,
    },
  },
});
