import { list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { PaymentStatusOptions } from "../consts/payment-status-options.const";
import { filterCustomerAccessCreate } from "../shared";
import { PaymentStatus } from "../enums/payment-status.enum";
import { handleReceiptToNalog } from "../lib/handleReceiptToNalog";

export const Payment = list({
  fields: {
    order: relationship({ ref: "Order.payments" }),
    sum: integer({ defaultValue: 0 }),
    externalId: text(),
    receiptId: text(),
    status: select({
      type: "enum",
      options: PaymentStatusOptions,
      defaultValue: PaymentStatus.Created,
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
  hooks: {
    afterOperation: handleReceiptToNalog,
  },
  access: {
    operation: {
      query: ({ session }) => !!session,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    item: {
      create: ({ session, inputData }) =>
        filterCustomerAccessCreate(session, inputData),
    },
  },
});
