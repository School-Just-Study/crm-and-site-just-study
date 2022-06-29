import { list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { PaymentStatusOptions } from "../consts/payment-status-options.const";
import { filterCustomerAccess, filterCustomerAccessCreate } from "../shared";

export const Payment = list({
  fields: {
    order: relationship({ ref: "Order.payments" }),
    sum: integer({ defaultValue: 0 }),
    externalId: text(),
    receiptId: text(),
    status: select({
      type: "enum",
      options: PaymentStatusOptions,
      ui: { displayMode: "segmented-control" },
    }),
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
