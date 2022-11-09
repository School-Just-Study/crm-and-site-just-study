import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { gql } from './index';

interface Arguments {
  firstName?: string;
  secondName?: string;
  phone?: number;
  email: string;
  currency: string;
  language?: string;
}

export const cart = async (
  root: any,
  { data }: { data: Arguments },
  context: KeystoneContext,
) => {
  const { firstName, secondName, phone, email, currency } = data;

  const user = await context.query.User.findOne({
    where: { email },
    query: `id client { id }`,
  });

  if (firstName || secondName || phone) {
    const name = `${firstName} ${secondName}`;

    await context.query.Client.updateOne({
      where: { id: `${user.client.id}` },
      data: {
        name,
        phone,
        email,
      },
      query: `id email`,
    });
  }

  const res = await context.graphql.raw({
    variables: { userId: user.id, currency },
    query: gql`
        mutation ($userId: String!, $currency: String!) {
            checkout(userId: $userId, currency: $currency) {
                status
                redirectUrl
            }
        }
    `,
  });

  // @ts-ignore
  if (res.data?.checkout) {
    // @ts-ignore
    return res.data.checkout;
  } else {
    return res.errors;
  }
};
