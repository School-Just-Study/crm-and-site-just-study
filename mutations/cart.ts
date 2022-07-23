import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { graphql } from "./index";

interface Arguments {
  firstName: string;
  secondName: string;
  phone: number;
  email: string;
  currency: string;
  language: string;
}

export const cart = async (
  root: any,
  { data }: { data: Arguments },
  context: KeystoneContext
) => {
  const { firstName, secondName, phone, email, currency, language } = data;
  let user = await context.query.User.findOne({
    where: { email },
    query: `id`,
  });

  const name = `${firstName} ${secondName}`;

  if (!user) {
    user = await context.query.User.createOne({
      data: {
        name,
        phone,
        email,
        language,
      },
      query: `id`,
    });
  } else {
    user = await context.query.User.updateOne({
      where: { email },
      data: {
        name,
        phone,
        email,
      },
      query: `id`,
    });
  }

  const res = await context.graphql.raw({
    variables: { userId: user.id, currency },
    query: graphql`
      mutation ($userId: String!, $currency: String!) {
        checkout(userId: $userId, currency: $currency) {
          Success
          OrderId
          ErrCode
          RedirectUrl
          Amount
          SessionLifeTime
          AttemptsCount
          SessionId
        }
      }
    `,
  });

  if (res.data?.checkout) {
    return res.data.checkout;
  } else {
    return res.errors;
  }
};
