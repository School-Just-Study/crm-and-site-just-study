import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { Currency } from '../enums/currency.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { yooKassa } from '../utils/yookassa';

const { paytureEnStatus } = require("../utils/paytureEn");

interface Arguments {
  paymentId: string;
}

export const checkPayment = async (
  root: any,
  { paymentId }: Arguments,
  context: KeystoneContext
) => {
  let payment = await context.query.Payment.findOne({
    where: { id: paymentId },
    query: `id sessionId currency order { id leftPayments }`,
  });
  if (!payment) {
    throw new Error("Sorry! The payment does not exist!");
  }

  let res = { status: false };

  if (payment.currency === Currency.RUB) {
    const pay = await yooKassa.getPayment(payment.sessionId);
    res = { status: pay.status === "succeeded" };
  }

  if (payment.currency === Currency.USD) {
    const pay = await paytureEnStatus(payment.id);
    res = { status: pay.Success === "True" };
  }

  if (res.status) {
    return await context.query.Payment.updateOne({
      where: { id: paymentId },
      data: { status: PaymentStatus.Successfully },
      query: `id order { id } currency student { id } amount sessionId receiptId status createdAt lastModification`,
    });
  } else {
    return payment;
  }
};
