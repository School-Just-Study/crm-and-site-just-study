import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { Roles } from '../enums/roles.enum';
import { fieldsEmail } from '../lib/fieldsEmail';
import { getTextCurrency } from '../lib/getCurrency';
import { sendMessage } from './index';
import { Currency } from '../enums/currency.enum';

/**
 * Уведомление для студента об успешном платеже
 * @param clientId
 * @param paymentId
 * @param receiptId
 * @param ctx
 */
export const notifySuccessfulPaymentForClient = async (
    clientId: string,
    paymentId: number,
    ctx: KeystoneContext,
    receiptId?: string
) => {
    if (process.env.NODE_ENV === 'development') return;

    const client = await ctx.query.User.findOne({
        where: { id: clientId },
        query: `email name`
    });
    const payment = await ctx.query.Payment.findOne({
        where: { id: `${paymentId}` },
        query: `amount currency amountUSD`
    });

    const amountText = `${payment.currency === Currency.RUB ? payment.amount : payment.amountUSD} ${getTextCurrency(
        payment.currency
    )}`;

    const emailInfo = `
    <div style='display:flex; flex-direction: column; gap: 8px'>
    <p>${client.name}, ваше обучение успешно оплачено ✨</p>
    ${fieldsEmail('Сумма платежа', amountText)}
    ${
        receiptId &&
        `<div style='display:flex; flex-direction: column; width: 100%; align-items: center'>
      <p>Ваш чек:</p>
      <img src='https://lknpd.nalog.ru/api/v1/receipt/710303226683/${receiptId}/print' alt='чек'>
    </div>`
    }
    </div>
  `;

    await sendMessage({
        email: client.email,
        title: '🥳 Ваше обучение успешно оплачено',
        body: emailInfo
    });
};

/**
 * Уведомление для менеджеров об успешном платеже
 * @param clientId
 * @param paymentId
 * @param ctx
 */
export const notifySuccessfulPaymentForManagers = async (clientId: string, paymentId: number, ctx: KeystoneContext) => {
    if (process.env.NODE_ENV === 'development') return;

    const client = await ctx.query.User.findOne({
        where: { id: clientId },
        query: `email name`
    });
    const payment = await ctx.query.Payment.findOne({
        where: { id: `${paymentId}` },
        query: `receiptId amount amountUSD currency`
    });
    const managers = await ctx.query.User.findMany({
        where: { role: { in: [Roles.Admin, Roles.Manager] } },
        query: `email`
    });

    const managersEmail = managers.map((user) => user.email);
    const amountText = `${payment.currency === Currency.RUB ? payment.amount : payment.amountUSD} ${getTextCurrency(
        payment.currency
    )}`;

    const emailInfo = `
      <div style='display:flex; flex-direction: column; gap: 8px'>
      <p>Поздравляем!</p>
      <p>Поступил новый платеж от ${client.name} 😍</p>
      ${fieldsEmail('Сумма платежа: ', amountText)}
      <p>Чек уже отправлен клиенту на почту!</p>
    </div>
  `;

    await sendMessage({
        email: managersEmail,
        title: 'Новая оплата 💃🕺',
        body: emailInfo
    });
};
