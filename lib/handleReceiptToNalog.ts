import { PaymentStatus } from "../enums/payment-status.enum";
import { ListHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { Lists } from ".keystone/types";
import { NALOG_INN, NALOG_PASSWORD } from "../config";
import {
  notifySuccessfulPaymentForClient,
  notifySuccessfulPaymentForManagers,
} from "../notifications/successfulPayment";
import { Currency } from "../enums/currency.enum";
import { reConvertMoney } from "./convertMoney";
import { OrderStatus } from "../enums/order-status.enum";

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
      const nalogApi = new NalogApi({
        inn: NALOG_INN,
        password: NALOG_PASSWORD,
      });

      const status = resolvedData?.status || item?.status;

      if (status === PaymentStatus.Successfully && !item.receiptId) {
        if (item.orderId) {
          await context.query.Order.updateOne({
            where: { id: `${item.orderId}` },
            data: { status: OrderStatus.Processing },
          });
        }

        await notifySuccessfulPaymentForManagers(
          item.studentId as unknown as string,
          item.id,
          context
        );
        const amount = reConvertMoney(item.amount || 0, item.currency);
        const receiptId = await nalogApi.addIncome({
          name: `Консультационные услуги`,
          amount,
          quantity: 1,
        });
        await notifySuccessfulPaymentForClient(
          item.studentId as unknown as string,
          item.id,
          context,
          receiptId
        );

        return {
          ...resolvedData,
          receiptId,
        };
      }

      if (status === PaymentStatus.Cancelled) {
        if (item.currency === Currency.RUB) {
          await paytureRuRefund(item.id);
        }
        if (item.currency === Currency.USD) {
          await paytureEnRefund(item.id);
        }
        if (item.receiptId) {
          const receiptId = item.receiptId;
          await nalogApi.cancelIncome(receiptId, "Платеж отменен");
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
