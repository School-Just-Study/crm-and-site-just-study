import { list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  timestamp,
} from "@keystone-6/core/fields";
import { OrderStatusOptions } from "../consts/order-status-options.const";
import { filterCustomerAccess, filterCustomerAccessCreate } from "../shared";

export const Order = list({
  fields: {
    student: relationship({ ref: "User" }),
    payments: relationship({ ref: "Payment.order", many: true }),
    employee: relationship({ ref: "User", ui: { hideCreate: true } }),
    status: select({
      type: "enum",
      options: OrderStatusOptions,
      ui: { displayMode: "segmented-control" },
    }),
    amount: integer(),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: { createView: { fieldMode: "hidden" } },
    }),
    lastModification: timestamp({
      defaultValue: { kind: "now" },
      ui: { createView: { fieldMode: "hidden" } },
      db: {
        updatedAt: true,
      },
    }),
  },
  access: {
    operation: {
      query: ({ session }) => !!session,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    filter: {
      query: ({ session }) => filterCustomerAccess(session),
      update: ({ session }) => filterCustomerAccess(session),
      delete: ({ session }) => filterCustomerAccess(session),
    },
    item: {
      create: ({ session, inputData }) =>
        filterCustomerAccessCreate(session, inputData),
    },
  },
});
