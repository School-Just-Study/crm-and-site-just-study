import { list } from '@keystone-6/core';
import { integer, relationship, select, text } from '@keystone-6/core/fields';
import { PaymentStatusOptions } from '../consts/payment-status-options.const';
import { PaymentStatus } from '../enums/payment-status.enum';
import { handleReceiptToNalog } from '../lib/handleReceiptToNalog';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { currency } from '../fields/currency';
import { handleOrderStatusAfterPayment } from '../lib/handleOrderStatusAfterPayment';
import { ISession } from '../types';
import { Roles } from '../enums/roles.enum';

export const Payment = list({
    ui: {
        label: '❤️Платежи',
        listView: {
            initialColumns: ['id', 'order', 'status', 'amount', 'currency'],
            pageSize: 20,
            initialSort: { field: 'id', direction: 'DESC' }
        },
        isHidden: ({ session }: { session: ISession }) => session?.data.role !== Roles.Admin
    },
    fields: {
        order: relationship({ ref: 'Order.payments', label: 'Заказ' }),
        currency,
        student: relationship({ ref: 'User', label: 'Клиент' }),
        amount: integer({ defaultValue: 0, label: 'Сумма в рублях' }),
        amountUSD: integer({ defaultValue: 0, label: 'Сумма в долларах' }),
        sessionId: text({
            label: 'Платежная сессия',
            ui: { createView: { fieldMode: 'hidden' }, itemView: { fieldMode: 'read' } }
        }),
        receiptId: text({
            label: 'Номер чека',
            ui: { createView: { fieldMode: 'hidden' }, itemView: { fieldMode: 'read' } }
        }),
        status: select({
            type: 'enum',
            options: PaymentStatusOptions,
            defaultValue: PaymentStatus.Created,
            ui: { displayMode: 'segmented-control' },
            validation: { isRequired: true },
            label: 'Статус платежа'
        }),
        createdAt,
        lastModification
    },
    hooks: {
        resolveInput: handleReceiptToNalog,
        afterOperation: handleOrderStatusAfterPayment
    },
    access: {
        operation: {
            delete: ({ session }) => !!session,
            query: () => true,
            create: () => true,
            update: () => true
        }
    }
});
