import { ExtendGraphqlSchema } from "@keystone-6/core/dist/declarations/src/types/config";
import { graphQLSchemaExtension } from "@keystone-6/core";
import { authWithEmail } from "./authWithEmail";

export const graphql = String.raw;
export const extendGraphqlSchema: ExtendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      authWithEmail(email: String!): String
    }
  `,
  resolvers: {
    Mutation: {
      authWithEmail,
    },
  },
});
