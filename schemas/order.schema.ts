import { graphql, list } from "@keystone-6/core";
import {
  integer,
  relationship,
  select,
  text,
  virtual,
} from "@keystone-6/core/fields";
import { OrderStatusOptions } from "../consts/order-status-options.const";
import { Lists } from ".keystone/types";
import { OrderStatus } from "../enums/order-status.enum";
import { PaymentStatus } from "../enums/payment-status.enum";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { currency } from "../fields/currency";
import { handleOrderStatus } from "../lib/handleOrderStatus";

export const Order = list({
  ui: {
    label: "Заказы",
    description: "Список заказов клиентов",
    listView: {
      initialColumns: [
        "id",
        "label",
        "status",
        "leftPayments",
        "amount",
        "currency",
        "payed",
        "dept",
        "nextPayment",
      ],
      pageSize: 20,
    },
  },
  fields: {
    label: text(),
    student: relationship({ ref: "User" }),
    quantityPayments: integer({
      validation: { isRequired: true },
      defaultValue: 1,
      ui: { description: "Всего платежей" },
    }),
    leftPayments: virtual({
      ui: { description: "Осталось платежей" },
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.Order.Item, arg, context) {
          const payments = await context.query.Payment.findMany({
            where: { order: { id: { equals: item.id } } },
            query: `amount status`,
          });
          if (payments) {
            const successPayed = payments.filter(
              (item) => item.status === PaymentStatus.Successfully
            );
            return item.quantityPayments - successPayed.length;
          }
          return;
        },
      }),
    }),
    currency,
    payments: relationship({ ref: "Payment.order", many: true }),
    status: select({
      type: "enum",
      options: OrderStatusOptions,
      ui: { displayMode: "segmented-control" },
      defaultValue: OrderStatus.Created,
    }),
    subscriptions: relationship({
      ref: "UserSubscription",
      many: true,
    }),
    services: relationship({
      ref: "UserService",
      many: true,
    }),
    amount: integer(),
    payed: virtual({
      // @ts-ignore
      field: graphql.field({
        type: graphql.Int,
        async resolve(item: Lists.Order.Item, arg, context) {
          const payments = await context.query.Payment.findMany({
            where: { order: { id: { equals: item.id } } },
            query: `amount status`,
          });
          if (payments) {
            const successPayed = payments.filter(
              (item) => item.status === PaymentStatus.Successfully
            );
            return successPayed.reduce(
              (tally, payment) => tally + payment.amount,
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
            query: `amount status`,
          });
          if (payments) {
            const successPayed = payments.filter(
              (item) => item.status === PaymentStatus.Successfully
            );
            const payed = successPayed.reduce(
              (tally, payment) => tally + payment.amount,
              0
            );
            if (item.amount) {
              return Math.round(item.amount - payed);
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
          const order = await context.query.Order.findOne({
            where: { id: `${item.id}` },
            query: `leftPayments`,
          });
          const payments = await context.query.Payment.findMany({
            where: { order: { id: { equals: item.id } } },
            query: `amount status`,
          });
          if (payments) {
            const successPayed = payments.filter(
              (item) => item.status === PaymentStatus.Successfully
            );
            const payed = successPayed.reduce(
              (tally, payment) => tally + payment.amount,
              0
            );
            if (item.amount && order.leftPayments >= 1) {
              const dept = item.amount - payed;
              return Math.round(dept / order.leftPayments);
            } else {
              return 0;
            }
          }
          return;
        },
      }),
    }),
    createdAt,
    lastModification,
  },
  hooks: {
    resolveInput: handleOrderStatus,
  },
  access: {
    operation: {
      delete: ({ session }) => !!session,
      query: () => true,
      create: () => true,
      update: () => true,
    },
  },
});
