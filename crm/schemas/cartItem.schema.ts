import { graphql, list } from '@keystone-6/core';
import { integer, relationship, virtual } from '@keystone-6/core/fields';
import { handleCartItemPrice } from '../lib/handleCartItemPrice';
import { Lists } from '.keystone/types';

export const CartItem = list({
    ui: {
        isHidden: true,
        listView: {
            initialColumns: ['cart', 'originalPrice', 'price', 'service', 'subscription']
        },
        label: '🤌🏻Позиция в корзине'
    },
    fields: {
        cart: relationship({ ref: 'Cart.items', label: 'Корзина' }),
        subscription: relationship({
            ref: 'Subscription',
            label: 'Абонемент'
        }),
        service: relationship({
            ref: 'Service',
            label: 'Услуга'
        }),
        originalPrice: virtual({
            label: 'Оригинальная цена',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    let originalPrice = 0;
                    if (!item) return originalPrice;

                    if (item?.subscriptionId) {
                        const subscription = await context.query.Subscription.findOne({
                            where: { id: `${item.subscriptionId}` },
                            query: `price`
                        });
                        originalPrice += subscription.price;
                    }

                    if (item?.serviceId) {
                        const service = await context.query.Service.findOne({
                            where: { id: `${item.serviceId}` },
                            query: `price`
                        });
                        originalPrice += service.price;
                    }
                    return originalPrice;
                }
            })
        }),
        originalPriceUSD: virtual({
            label: 'Оригинальная цена в долларах',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    let originalPrice = 0;
                    if (!item) return originalPrice;

                    if (item?.subscriptionId) {
                        const subscription = await context.query.Subscription.findOne({
                            where: { id: `${item.subscriptionId}` },
                            query: `priceUSD`
                        });
                        originalPrice += subscription.priceUSD;
                    }

                    if (item?.serviceId) {
                        const service = await context.query.Service.findOne({
                            where: { id: `${item.serviceId}` },
                            query: `priceUSD`
                        });
                        originalPrice += service.priceUSD;
                    }
                    return originalPrice;
                }
            })
        }),
        price: integer({
            ui: { description: 'Цену можно не вписывать, если нет скидки.' },
            label: 'Цена для продажи'
        }),
        priceUSD: virtual<Lists.CartItem.TypeInfo>({
            label: 'Цена для продажи в долларах',
            field: graphql.field({
                type: graphql.Int,
                async resolve(item, arg, context) {
                    if (item.price) {
                        const currencyUSD = await context.query.Currency.findOne({
                            where: { charCode: 'USD' },
                            query: `value`
                        });
                        const amountUsd = item.price / currencyUSD.value;
                        return Math.ceil(amountUsd);
                    }
                    return;
                }
            })
        })
    },
    hooks: {
        resolveInput: handleCartItemPrice
    },
    access: {
        operation: {
            query: () => true,
            create: () => true,
            update: () => true,
            delete: () => true
        }
    }
});
