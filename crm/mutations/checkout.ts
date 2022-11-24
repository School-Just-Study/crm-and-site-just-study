import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { gql } from './index';
import { addDays } from 'date-fns';

interface Arguments {
    userId: string;
    currency: string;
}

export const checkout = async (root: any, { userId, currency }: Arguments, context: KeystoneContext) => {
    const user = await context.query.User.findOne({
        where: { id: userId },
        query: `id name cart { id }`
    });
    if (!user) {
        throw new Error('Sorry! The user does not exist!');
    }

    const cart = await context.query.Cart.findOne({
        where: { id: user.cart.id },
        query: `id items { id subscription { id name } service { id name } price } quantityPayments amount amountUSD`
    });

    const subscriptionsIds = cart.items
        .filter((item: any) => item.subscription)
        .map((item: any) => {
            return {
                id: item?.subscription?.id,
                price: item.price,
                name: item?.subscription?.name
            };
        });
    const servicesIds = cart.items
        .filter((item: any) => item.service)
        .map((item: any) => {
            return {
                id: item?.service?.id,
                price: item.price,
                name: item?.service?.name
            };
        });

    const orderItemsText: string[] = [];
    subscriptionsIds.forEach((item: any) => orderItemsText.push(item.name));
    servicesIds.map((item: any) => orderItemsText.push(item.name));
    const orderText = `${user.name}: ${orderItemsText.join(', ')}`;

    const order = await context.query.Order.createOne({
        data: {
            label: orderText,
            currency,
            student: { connect: { id: userId } },
            quantityPayments: cart.quantityPayments,
            amount: cart.amount
        },
        query: `id`
    });

    if (subscriptionsIds) {
        subscriptionsIds.map(async ({ id, price }: { id: string; price: number }) => {
            const subscriptionTemplate = await context.query.Subscription.findOne({
                where: { id },
                query: `name visitCount price period trial unlimited`
            });

            const endDate = addDays(new Date(), subscriptionTemplate.period);

            const userSubscription = await context.query.UserSubscription.createOne({
                data: {
                    name: subscriptionTemplate.name,
                    visitCount: subscriptionTemplate.visitCount,
                    originalPrice: subscriptionTemplate.price,
                    price,
                    endDate,
                    trial: subscriptionTemplate.trial,
                    unlimited: subscriptionTemplate.unlimited,
                    student: { connect: { id: userId } }
                },
                query: `id`
            });
            await context.query.Order.updateOne({
                where: { id: order.id },
                data: {
                    subscriptions: { connect: { id: userSubscription.id } }
                }
            });
        });
    }

    if (servicesIds) {
        servicesIds.map(async ({ id, price }: { id: string; price: number }) => {
            const serviceTemplate = await context.query.Service.findOne({
                where: { id },
                query: `name price`
            });

            const userService = await context.query.UserService.createOne({
                data: {
                    name: serviceTemplate.name,
                    originalPrice: serviceTemplate.price,
                    price,
                    student: { connect: { id: userId } }
                },
                query: `id`
            });
            await context.query.Order.updateOne({
                where: { id: order.id },
                data: {
                    services: { connect: { id: userService.id } }
                }
            });
        });
    }

    const cartItemsIds = await context.query.CartItem.findMany({
        where: { cart: { id: { equals: cart.id } } },
        query: `id`
    });

    if (cartItemsIds) {
        await context.query.CartItem.deleteMany({
            where: cartItemsIds
        });
    }

    await context.query.Cart.updateOne({
        where: { id: cart.id },
        data: { quantityPayments: 1 }
    });

    const res = await context.graphql.raw({
        variables: { orderId: order.id, currency },
        query: gql`
            mutation ($orderId: String!, $currency: String) {
                payment(orderId: $orderId, currency: $currency) {
                    status
                    redirectUrl
                }
            }
        `
    });

    // @ts-ignore
    if (res.data?.payment) {
        // @ts-ignore
        return res.data?.payment;
    } else {
        res.errors;
    }
};
