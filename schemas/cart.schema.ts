import { list } from "@keystone-6/core";
import { integer, relationship } from "@keystone-6/core/fields";
import { filterCustomerAccess } from "../shared";
import { lastModification } from "../fields/lastModification";

export const Cart = list({
  fields: {
    user: relationship({
      ref: "User",
      ui: {
        hideCreate: true,
      },
    }),
    subscriptions: relationship({
      ref: "Subscription",
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    services: relationship({
      ref: "Service",
      many: true,
      ui: {
        hideCreate: true,
      },
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
    filter: {
      query: ({ session }) => filterCustomerAccess(session),
      update: ({ session }) => filterCustomerAccess(session),
      delete: ({ session }) => filterCustomerAccess(session),
    },
  },
  graphql: {
    omit: ["create"],
  },
});
