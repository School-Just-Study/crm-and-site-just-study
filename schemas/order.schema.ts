import { graphql, list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { OrderStatusOptions } from "../consts/order-status-options.const";
import { filterCustomerAccess, filterCustomerAccessCreate } from "../shared";
import { Lists } from ".keystone/types";
import { OrderStatus } from "../enums/order-status.enum";
import { PaymentStatus } from "../enums/payment-status.enum";
import format from "date-fns/format";

export const Order = list({
  fields: {
    label: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.String,
        async resolve(item: Lists.Order.Item, arg, context) {
          // @ts-ignore
          const student: Lists.User.Item = await context.query.User.findOne({
            where: { id: item.studentId },
            query: `name`,
          });
          if (student) {
            return `Order for ${student.name} from ${format(
              item.createdAt!,
              "dd.MM.yyyy"
            )}`;
          }
          return;
        },
      }),
    }),
    student: relationship({ ref: "User" }),
    leftPayments: integer({
      validation: { isRequired: true },
      defaultValue: 1,
    }),
    payments: relationship({ ref: "Payment.order", many: true }),
    employee: relationship({ ref: "User", ui: { hideCreate: true } }),
    status: select({
      type: "enum",
      options: OrderStatusOptions,
      ui: { displayMode: "segmented-control" },
      defaultValue: OrderStatus.Created,
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
    amount: integer(),
    payed: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.Order.Item, arg, context) {
          const payments = await context.query.Payment.findMany({
            where: { order: { id: { equals: item.id } } },
            query: `sum status`,
          });
          if (payments) {
            const successPayed = payments.filter(
              (item) => item.status === PaymentStatus.Successfully
            );
            return successPayed.reduce(
              (tally, payment) => tally + payment.sum,
              0
            );
          }
          return;
        },
      }),
    }),
    dept: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.Order.Item, arg, context) {
          const payments = await context.query.Payment.findMany({
            where: { order: { id: { equals: item.id } } },
            query: `sum status`,
          });
          if (payments) {
            const successPayed = payments.filter(
              (item) => item.status === PaymentStatus.Successfully
            );
            const payed = successPayed.reduce(
              (tally, payment) => tally + payment.sum,
              0
            );
            if (item.amount) {
              return item.amount - payed;
            } else {
              return 0;
            }
          }
          return;
        },
      }),
    }),
    nextPayment: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.Order.Item, arg, context) {
          const payments = await context.query.Payment.findMany({
            where: { order: { id: { equals: item.id } } },
            query: `sum status`,
          });
          if (payments) {
            const successPayed = payments.filter(
              (item) => item.status === PaymentStatus.Successfully
            );
            const payed = successPayed.reduce(
              (tally, payment) => tally + payment.sum,
              0
            );
            if (item.amount && item.leftPayments >= 1) {
              const dept = item.amount - payed;
              return dept / item.leftPayments;
            } else {
              return 0;
            }
          }
          return;
        },
      }),
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
