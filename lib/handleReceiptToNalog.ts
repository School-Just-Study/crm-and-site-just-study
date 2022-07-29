import { PaymentStatus } from "../enums/payment-status.enum";
import { ListHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { Lists } from ".keystone/types";
import { NALOG_INN, NALOG_PASSWORD } from "../config";
import {
  notifySuccessfulPaymentForClient,
  notifySuccessfulPaymentForManagers,
} from "../notifications/successfulPayment";
import { Currency } from "../enums/currency.enum";

const { NalogApi } = require("lknpd-nalog-api");
const { paytureRuRefund } = require("../utils/paytureRu");
const { paytureEnRefund } = require("../utils/paytureEn");

/**
 * Отправляем платеж в налоговую если платеж имеет статус Successfully, и отменяем его, если статус Cancelled
 * @param operation
 * @param item
 * @param context
 * @param resolvedData
 */
export const handleReceiptToNalog: ListHooks<Lists.Payment.TypeInfo>["resolveInput"] =
  async ({ item, context, operation, resolvedData }) => {
    if (operation === "update") {
      if (resolvedData.status) return resolvedData;

      const nalogApi = new NalogApi({
        inn: NALOG_INN,
        password: NALOG_PASSWORD,
      });

      if (!nalogApi) return;

      if (item?.status === PaymentStatus.Successfully && !item.receiptId) {
        const order = await context.query.Order.findOne({
          where: { id: `${item.orderId}` },
          query: `student { id name }`,
        });
        const receiptId = await nalogApi.addIncome({
          name: `Консультационные услуги для клиента ${order.student.name}`,
          amount: item.amount,
          quantity: 1,
        });
        await notifySuccessfulPaymentForClient(
          order.student.id,
          item.id,
          context
        );
        await notifySuccessfulPaymentForManagers(
          order.student.id,
          item.id,
          context
        );

        return {
          ...resolvedData,
          receiptId,
        };
      }

      if (item?.status === PaymentStatus.Cancelled) {
        if (item.receiptId) {
          const receiptId = item.receiptId;
          await nalogApi.cancelIncome(receiptId, "Платеж отменен");
        }
        if (item.currency === Currency.RUB) {
          await paytureRuRefund(item.id);
        }
        if (item.currency === Currency.USD) {
          await paytureEnRefund(item.id);
        }

        return {
          ...resolvedData,
          receiptId: "",
          sessionId: "",
        };
      }
    }
    return resolvedData;
  };
