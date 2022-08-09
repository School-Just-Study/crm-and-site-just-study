import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { mailer } from '../lib/nodemailer';
import { baseTemplateEmail } from '../mailTemplate/base';
import { Roles } from '../enums/roles.enum';
import { fieldsEmail } from '../lib/fieldsEmail';
import { getTextCurrency } from '../lib/getCurrency';
import { from } from './index';

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
  receiptId?: number
) => {
  const client = await ctx.query.User.findOne({
    where: { id: clientId },
    query: `email name`,
  });
  const payment = await ctx.query.Payment.findOne({
    where: { id: `${paymentId}` },
    query: `amount currency`,
  });

  const amountText = `${payment.amount} ${getTextCurrency(payment.currency)}`;

  const emailInfo = `
    <div style='display:flex; flex-direction: column; gap: 8px'>
    <p>${client.name}, ваше обучение успешно оплачено ✨</p>
    ${fieldsEmail("Сумма платежа", amountText)}
    <div style='display:flex; flex-direction: column; width: 100%; align-items: center'>
      <p>Ваш чек:</p>
      <img src='https://lknpd.nalog.ru/api/v1/receipt/710303226683/${receiptId}/print' alt='чек'>
    </div>
    </div>
  `;

  await mailer.sendMail({
    to: client.email,
    from,
    subject: "Ваше обучение успешно оплачено",
    html: baseTemplateEmail("Уведомление об платеже", emailInfo),
  });
};

/**
 * Уведомление для менеджеров об успешном платеже
 * @param clientId
 * @param paymentId
 * @param ctx
 */
export const notifySuccessfulPaymentForManagers = async (
  clientId: string,
  paymentId: number,
  ctx: KeystoneContext
) => {
  const client = await ctx.query.User.findOne({
    where: { id: clientId },
    query: `email name`,
  });
  const payment = await ctx.query.Payment.findOne({
    where: { id: `${paymentId}` },
    query: `receiptId amount currency`,
  });
  const managers = await ctx.query.User.findMany({
    where: { role: { in: [Roles.Admin, Roles.Manager] } },
    query: `email`,
  });

  const managersEmail = managers.map((user) => user.email);
  const amountText = `${payment.amount} ${getTextCurrency(payment.currency)}`;

  const emailInfo = `
  <div style='display:flex; flex-direction: column; gap: 8px'>
  <p>Поздравляем!</p>
  <p>Поступил новый платеж от ${client.name} 😍</p>
  ${fieldsEmail("Сумма платежа: ", amountText)}
  <p>Чек уже отправлен клиенту на почту!</p>
</div>
  `;

  await mailer.sendMail({
    to: managersEmail,
    from,
    subject: "Новая оплата 💃🕺",
    html: baseTemplateEmail("Уведомление об платеже", emailInfo),
  });
};