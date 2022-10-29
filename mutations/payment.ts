import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { FRONTEND_URL } from "../config";
import { Currency } from "../enums/currency.enum";
import { OrderStatus } from "../enums/order-status.enum";
import { ICreatePayment } from "@a2seven/yoo-checkout";
import { yooKassa } from "../utils/yookassa";
import { v4 as uuid } from "uuid";

const { paytureEnInit } = require("../utils/paytureEn");

interface Arguments {
  orderId: string;
}

/**
 * Создаем платеж и получаем ссылку на оплату
 * @param root
 * @param orderId
 * @param context
 */
export const payment = async (
  root: any,
  { orderId }: Arguments,
  context: KeystoneContext
) => {
  const order = await context.query.Order.findOne({
    where: { id: orderId },
    query: `label currency amount nextPayment status student { id name email }`,
  });
  if (!order) {
    throw new Error("Sorry! The order does not exist!");
  }
  if (order.status === OrderStatus.Finished) {
    throw new Error("Sorry! The order is finished");
  }

  const payment = await context.query.Payment.createOne({
    data: {
      order: { connect: { id: orderId } },
      currency: order.currency,
      student: { connect: { id: order.student.id } },
      amount: order.nextPayment,
    },
    query: `id amount currency`,
  });

  if (!payment) {
    throw new Error("Sorry! The payment does not exist!");
  }

  if (payment.currency === Currency.RUB) {
    const createPayload: ICreatePayment = {
      amount: {
        value: `${payment.amount}.00`,
        currency: "RUB",
      },
      description: order.label,
      confirmation: {
        type: "redirect",
        return_url: `${FRONTEND_URL}/checkout/result?orderid=${payment.id}`,
      },
      capture: true,
      metadata: {
        orderId,
        paymentId: payment.id,
      },
      merchant_customer_id: order.student.id,
    };

    const idempotenceKey = uuid();

    const res = await yooKassa.createPayment(createPayload, idempotenceKey);

    if (res) {
      await context.query.Payment.updateOne({
        where: { id: payment.id },
        data: {
          sessionId: res.id,
        },
      });
    }

    const status = res.status === "pending";

    return {
      status,
      redirectUrl: res.confirmation.confirmation_url,
    };
  }

  if (payment.currency === Currency.USD) {
    const paytureData = {
      OrderId: payment.id,
      Amount: payment.amount * 100,
      SessionType: "Pay",
      Url: `${FRONTEND_URL}/checkout/result?orderid={orderid}&result={success}`,
      Product: order.label,
      Total: order.nextPayment,
    };

    const res = await paytureEnInit(paytureData);

    if (res) {
      await context.query.Payment.updateOne({
        where: { id: payment.id },
        data: {
          sessionId: res.SessionId,
        },
      });
    }

    const status = res.Success === "True";

    return { status, redirectUrl: res.RedirectUrl };
  }
};
