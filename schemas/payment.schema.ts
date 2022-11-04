import { list } from "@keystone-6/core";
import { integer, relationship, select, text } from "@keystone-6/core/fields";
import { PaymentStatusOptions } from "../consts/payment-status-options.const";
import { PaymentStatus } from "../enums/payment-status.enum";
import { handleReceiptToNalog } from "../lib/handleReceiptToNalog";
import { createdAt } from "../fields/createdAt";
import { lastModification } from "../fields/lastModification";
import { currency } from "../fields/currency";
import { handleOrderStatusAfterPayment } from "../lib/handleOrderStatusAfterPayment";

export const Payment = list({
  ui: {
    label: "Платежи",
    listView: {
      initialColumns: ["id", "order", "status", "amount", "currency"],
      pageSize: 20,
    },
  },
  fields: {
    order: relationship({ ref: "Order.payments", label: "Заказ" }),
    currency,
    student: relationship({ ref: "User", label: "Клиент" }),
    amount: integer({ defaultValue: 0, label: "Сумма" }),
    sessionId: text({ label: "Платежная сессия" }),
    receiptId: text({ label: "Номер чека" }),
    status: select({
      type: "enum",
      options: PaymentStatusOptions,
      defaultValue: PaymentStatus.Created,
      ui: { displayMode: "segmented-control" },
      validation: { isRequired: true },
      label: "Статус платежа",
    }),
    createdAt,
    lastModification,
  },
  hooks: {
    resolveInput: handleReceiptToNalog,
    afterOperation: handleOrderStatusAfterPayment,
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
