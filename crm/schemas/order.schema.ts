import { graphql, list } from '@keystone-6/core';
import { integer, relationship, select, text, virtual } from '@keystone-6/core/fields';
import { OrderStatusOptions } from '../consts/order-status-options.const';
import { Lists } from '.keystone/types';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { currency } from '../fields/currency';
import { handleOrderStatus } from '../lib/handleOrderStatus';
import { FRONTEND_URL } from '../config';
import { EditOnlyAdminForUi } from '../validation';
import { ISession } from '../types';
import { Roles } from '../enums/roles.enum';

export const Order = list({
    ui: {
        label: '🥰Заказы',
        listView: {
            initialColumns: [
                'id',
                'label',
                'status',
                'leftPayments',
                'amount',
                'currency',
                'payed',
                'dept',
                'nextPayment'
            ],
            initialSort: { field: 'status', direction: 'ASC' },
            pageSize: 20
        },
        hideCreate: ({ session }: { session: ISession }) => session?.data.role !== Roles.Admin
    },
    fields: {
        label: text({ label: 'Название заказа' }),
        linkForUser: virtual<Lists.Order.TypeInfo>({
            label: 'Ссылка для клиента',
            field: graphql.field({
                type: graphql.String,
                async resolve(item, arg, context) {
                    const user = await context.query.User.findOne({
                        where: { id: `${item.studentId}` },
                        query: 'email language'
                    });
                    return `${FRONTEND_URL}/${user.language}/checkout?setEmail=${user.email}`;
                }
            })
        }),
        student: relationship({
            ref: 'User',
            label: 'Клиент',
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi }
            }
        }),
        quantityPayments: integer({
            validation: { isRequired: true },
            defaultValue: 1,
            ui: { description: 'Всего платежей' },
            label: 'Количество платежей'
        }),
        leftPayments: virtual<Lists.Order.TypeInfo>({
            label: 'Осталось платежей',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    const payments = await context.query.Payment.findMany({
                        where: { order: { id: { equals: item.id } } },
                        query: `amount status`
                    });
                    if (payments) {
                        const successPayed = payments.filter((item) => item.status === PaymentStatus.Successfully);
                        return item.quantityPayments - successPayed.length;
                    }
                    return;
                }
            })
        }),
        currency,
        payments: relationship({
            ref: 'Payment.order',
            many: true,
            label: 'Платежи',
            ui: {
                displayMode: 'cards',
                cardFields: ['status', 'amount', 'amountUSD'],
                itemView: { fieldMode: EditOnlyAdminForUi }
            }
        }),
        status: select({
            type: 'enum',
            label: 'Статус заказа',
            options: OrderStatusOptions,
            ui: { displayMode: 'segmented-control', itemView: { fieldMode: EditOnlyAdminForUi } },
            defaultValue: OrderStatus.Created
        }),
        subscriptions: relationship({
            ref: 'UserSubscription',
            many: true,
            label: 'Абонементы',
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi }
            }
        }),
        services: relationship({
            ref: 'UserService',
            many: true,
            label: 'Услуги',
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi }
            }
        }),
        amount: integer({ label: 'Сумма' }),
        amountUSD: virtual<Lists.Order.TypeInfo>({
            label: 'Сумма в долларах',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    if (item.amount) {
                        const currencyUSD = await context.query.Currency.findOne({
                            where: { charCode: 'USD' },
                            query: `value`
                        });
                        const amountUsd = item.amount / currencyUSD.value;
                        return Math.ceil(amountUsd);
                    }
                    return;
                }
            })
        }),
        payed: virtual<Lists.Order.TypeInfo>({
            label: 'Оплачено',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    const payments = await context.query.Payment.findMany({
                        where: { order: { id: { equals: item.id } } },
                        query: `amount status`
                    });
                    if (payments) {
                        const successPayed = payments.filter((item) => item.status === PaymentStatus.Successfully);
                        return successPayed.reduce((tally, payment) => tally + payment.amount, 0);
                    }
                    return;
                }
            })
        }),
        dept: virtual<Lists.Order.TypeInfo>({
            label: 'Долг',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    const payments = await context.query.Payment.findMany({
                        where: { order: { id: { equals: item.id } } },
                        query: `amount status`
                    });
                    if (payments) {
                        const successPayed = payments.filter((item) => item.status === PaymentStatus.Successfully);
                        const payed = successPayed.reduce((tally, payment) => tally + payment.amount, 0);
                        if (item.amount) {
                            return Math.round(item.amount - payed);
                        } else {
                            return 0;
                        }
                    }
                    return;
                }
            })
        }),
        nextPayment: virtual<Lists.Order.TypeInfo>({
            label: 'Следующая оплата в рублях',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    const order = await context.query.Order.findOne({
                        where: { id: `${item.id}` },
                        query: `leftPayments`
                    });
                    const payments = await context.query.Payment.findMany({
                        where: { order: { id: { equals: item.id } } },
                        query: `amount status`
                    });
                    if (payments) {
                        const successPayed = payments.filter((item) => item.status === PaymentStatus.Successfully);
                        const payed = successPayed.reduce((tally, payment) => tally + payment.amount, 0);
                        if (item.amount && order.leftPayments >= 1) {
                            const dept = item.amount - payed;
                            return Math.ceil(dept / order.leftPayments);
                        } else {
                            return 0;
                        }
                    }
                    return;
                }
            })
        }),
        nextPaymentUSD: virtual<Lists.Order.TypeInfo>({
            label: 'Следующая оплата в долларах',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    const order = await context.query.Order.findOne({
                        where: { id: `${item.id}` },
                        query: `nextPayment`
                    });
                    if (order.nextPayment) {
                        const currencyUSD = await context.query.Currency.findOne({
                            where: { charCode: 'USD' },
                            query: `value`
                        });
                        const amountUsd = order.nextPayment / currencyUSD.value;
                        return Math.ceil(amountUsd);
                    }
                    return;
                }
            })
        }),
        createdAt,
        lastModification
    },
    hooks: {
        resolveInput: handleOrderStatus
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
