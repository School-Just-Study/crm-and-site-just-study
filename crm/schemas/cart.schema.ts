import { graphql, list } from '@keystone-6/core';
import { integer, relationship, virtual } from '@keystone-6/core/fields';
import { lastModification } from '../fields/lastModification';
import { Lists } from '.keystone/types';
import { currency } from '../fields/currency';
import { FRONTEND_URL } from '../config';
import { Roles } from '../enums/roles.enum';

export const Cart = list({
    ui: {
        label: 'Корзины',
        description: 'Корзина для клиентов',
        labelField: 'label',
        listView: {
            initialColumns: ['label', 'quantityPayments', 'amountRUB'],
            pageSize: 20
        }
    },
    fields: {
        label: virtual({
            // @ts-ignore
            field: graphql.field({
                type: graphql.String,
                async resolve(item: Lists.Cart.Item, arg, context) {
                    if (!item) return;
                    const user = await context.query.User.findOne({
                        where: { id: `${item.userId}` },
                        query: 'name'
                    });
                    return `Корзина №${item.id} - ${user.name}`;
                }
            })
        }),
        user: relationship({
            ref: 'User.cart',
            label: 'Клиент',
            ui: {
                hideCreate: true
            }
        }),
        linkForUser: virtual({
            label: 'Ссылка для клиента',
            // @ts-ignore
            field: graphql.field({
                type: graphql.String,
                async resolve(item: Lists.Cart.Item, arg, context) {
                    const user = await context.query.User.findOne({
                        where: { id: `${item.userId}` },
                        query: 'email language'
                    });
                    return `${FRONTEND_URL}/${user.language}/checkout?setEmail=${user.email}`;
                }
            })
        }),
        currency,
        items: relationship({
            ref: 'CartItem.cart',
            label: 'Позиции в корзине',
            many: true,
            ui: {
                description: 'В каждом item может быть ВНИМАНИЕ! либо абонемент, либо услуга.',
                displayMode: 'cards',
                cardFields: ['subscription', 'service', 'originalPrice', 'price'],
                inlineEdit: { fields: ['subscription', 'service', 'price'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['subscription', 'service', 'price'] }
            }
        }),
        amountRUB: virtual({
            label: 'Сумма в рублях',
            // @ts-ignore
            field: graphql.field({
                type: graphql.Int,
                async resolve(item: Lists.Cart.Item, arg, context) {
                    const cartItems = await context.query.CartItem.findMany({
                        where: { cart: { id: { equals: item.id } } },
                        query: `price`
                    });
                    if (cartItems) {
                        return cartItems.reduce((tally, item) => tally + item.price, 0);
                    }
                    return;
                }
            })
        }),
        amountUSD: virtual({
            label: 'Сумма в долларах',
            // @ts-ignore
            field: graphql.field({
                type: graphql.Int,
                async resolve(item: Lists.Cart.Item, arg, context) {
                    const cartItems = await context.query.CartItem.findMany({
                        where: { cart: { id: { equals: item.id } } },
                        query: `price`
                    });
                    if (cartItems) {
                        const currencyUSD = await context.query.Currency.findOne({
                            where: { charCode: 'USD' },
                            query: `value`
                        });
                        const amount = cartItems.reduce((tally, item) => tally + item.price, 0);
                        return Math.round(amount / currencyUSD.value);
                    }
                    return;
                }
            })
        }),
        quantityPayments: integer({
            defaultValue: 1,
            label: 'Количество платежей'
        }),
        lastModification
    },
    access: {
        operation: {
            query: () => true,
            create: () => true,
            update: () => true,
            delete: ({ session }) => !!session && session.data.role === Roles.Admin
        }
    },
    graphql: {
        omit: ['create']
    }
});
