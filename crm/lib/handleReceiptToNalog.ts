import { PaymentStatus } from '../enums/payment-status.enum';
import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { Lists } from '.keystone/types';
import {
    notifySuccessfulPaymentForClient,
    notifySuccessfulPaymentForManagers
} from '../notifications/successfulPayment';
import { Currency } from '../enums/currency.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { ICreateRefund } from '@a2seven/yoo-checkout';
import { yooKassa } from '../utils/yookassa';
import { v4 as uuid } from 'uuid';
import { addRecent, cancelRecent } from '../utils/nalogApi';

const { paytureEnRefund } = require('../utils/paytureEn');

/**
 * Отправляем платеж в налоговую если платеж имеет статус Successfully, и отменяем его, если статус Cancelled
 * @param operation
 * @param item
 * @param context
 * @param resolvedData
 */
export const handleReceiptToNalog: ListHooks<Lists.Payment.TypeInfo>['resolveInput'] = async ({
    item,
    context,
    operation,
    resolvedData
}) => {
    if (operation === 'update') {
        const status = resolvedData.status || item.status;

        if (status === PaymentStatus.Successfully && !item.receiptId) {
            await notifySuccessfulPaymentForManagers(item.studentId as unknown as string, item.id, context);
            const receiptId = (await addRecent(item.amount || 0, item.orderId || 0)) || '';

            await notifySuccessfulPaymentForClient(item.studentId as unknown as string, item.id, context, receiptId);

            return {
                ...resolvedData,
                receiptId
            };
        }

        await context.query.Order.updateOne({
            where: { id: `${item.orderId}` },
            data: { status: OrderStatus.Processing }
        });

        if (status === PaymentStatus.Cancelled) {
            if (item.currency === Currency.RUB && item.sessionId) {
                const createRefundPayload: ICreateRefund = {
                    payment_id: item.sessionId,
                    amount: {
                        value: `${item.amount}.00`,
                        currency: 'RUB'
                    }
                };
                const idempotenceKey = uuid();
                await yooKassa.createRefund(createRefundPayload, idempotenceKey);
            }
            if (item.currency === Currency.USD) {
                await paytureEnRefund(item.id);
            }

            if (item.receiptId) {
                cancelRecent(item.receiptId);
            }

            return {
                ...resolvedData,
                receiptId: '',
                sessionId: ''
            };
        }
    }
    return resolvedData;
};
