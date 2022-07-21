import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";

interface Arguments {
  orderId: string;
}

export const payment = async (
  root: any,
  { orderId }: Arguments,
  context: KeystoneContext
) => {
  const order = await context.query.Order.findOne({
    where: { id: orderId },
    query: `id `,
  });
  if (!order) {
    throw new Error("Sorry! The order does not exist!");
  }
};
