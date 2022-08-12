import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";

interface Arguments {
  firstName: string;
  secondName: string;
  phone: number;
  email: string;
  language?: string;
}

export const authCart = async (
  root: any,
  { data }: { data: Arguments },
  context: KeystoneContext
) => {
  const { firstName, secondName, phone, email, language } = data;
  let client = await context.query.User.findOne({
    where: { email },
    query: `id email`,
  });

  const name = `${firstName} ${secondName}`;

  if (!client) {
    client = await context.query.Client.createOne({
      data: {
        name,
        phone,
        email,
        language,
      },
      query: `id email`,
    });
  } else {
    client = await context.query.Client.updateOne({
      where: { email },
      data: {
        name,
        phone,
        email,
      },
      query: `id email`,
    });
  }

  return client;
};
