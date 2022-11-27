import { graphql, list } from '@keystone-6/core';
import { integer, relationship, virtual } from '@keystone-6/core/fields';
import { lastModification } from '../fields/lastModification';
import { Lists } from '.keystone/types';
import { currency } from '../fields/currency';
import { FRONTEND_URL } from '../config';
import { Roles } from '../enums/roles.enum';
import { ISession } from '../types';
import { EditOnlyAdminForUi } from '../validation';

export const Cart = list({
    ui: {
        label: '🛒Корзины',
        labelField: 'label',
        listView: {
            initialColumns: ['label', 'quantityPayments', 'amountRUB'],
            pageSize: 20
        },
        hideCreate: ({ session }: { session: ISession }) => session?.data.role !== Roles.Admin,
        hideDelete: ({ session }: { session: ISession }) => session?.data.role !== Roles.Admin
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
                hideCreate: true,
                itemView: { fieldMode: EditOnlyAdminForUi }
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
                cardFields: ['subscription', 'service', 'originalPrice', 'price', 'originalPriceUSD', 'priceUSD'],
                inlineEdit: { fields: ['subscription', 'service', 'price'] },
                linkToItem: true,
                inlineCreate: { fields: ['subscription', 'service', 'price'] }
            }
        }),
        // @ts-ignore
        amount: virtual<Lists.Cart.TypeInfo>({
            label: 'Сумма в рублях',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
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
        // @ts-ignore
        amountUSD: virtual<Lists.Cart.TypeInfo>({
            label: 'Сумма в долларах',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    const cart = await context.query.Cart.findOne({
                        where: { id: `${item.id}` },
                        query: `amount`
                    });
                    if (cart) {
                        const currencyUSD = await context.query.Currency.findOne({
                            where: { charCode: 'USD' },
                            query: `value`
                        });
                        const amountUsd = cart.amount / currencyUSD.value;
                        return Math.ceil(amountUsd);
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
