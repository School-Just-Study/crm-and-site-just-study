import { graphql, list } from "@keystone-6/core";
import { integer, relationship, virtual } from "@keystone-6/core/fields";
import { lastModification } from "../fields/lastModification";
import { Lists } from ".keystone/types";
import { currency } from "../fields/currency";
import { FRONTEND_URL } from "../config";

export const Cart = list({
  ui: {
    label: "Корзины",
    description: "Корзина для клиентов",
    listView: {
      initialColumns: ["user", "quantityPayments"],
      pageSize: 20,
    },
  },
  fields: {
    user: relationship({
      ref: "User.cart",
      ui: {
        hideCreate: true,
      },
    }),
    linkForUser: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.String,
        async resolve(item: Lists.Cart.Item, arg, context) {
          const user = await context.query.User.findOne({
            where: { id: `${item.userId}` },
            query: "email language",
          });
          return `${FRONTEND_URL}/${user.language}/checkout?setEmail=${user.email}`;
        },
      }),
    }),
    currency,
    items: relationship({
      ref: "CartItem.cart",
      many: true,
      ui: {
        description:
          "В каждом item может быть ВНИМАНИЕ! либо абонемент, либо услуга.",
        displayMode: "cards",
        cardFields: ["subscription", "service", "originalPrice", "price"],
        inlineEdit: { fields: ["subscription", "service", "price"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["subscription", "service", "price"] },
      },
    }),
    amount: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.Cart.Item, arg, context) {
          const cartItems = await context.query.CartItem.findMany({
            where: { cart: { id: { equals: item.id } } },
            query: `price`,
          });
          if (cartItems) {
            return cartItems.reduce((tally, item) => tally + item.price, 0);
          }
        },
      }),
    }),
    quantityPayments: integer({ defaultValue: 1 }),
    lastModification,
  },
  access: {
    operation: {
      query: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
  },
  graphql: {
    omit: ["create"],
  },
});
