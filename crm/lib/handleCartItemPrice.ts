import { ListHooks } from '@keystone-6/core/types';
import { Lists } from '.keystone/types';

/**
 * Определяем price cartItem на основании subscription или service
 * @param context
 * @param item
 * @param resolvedData
 */
export const handleCartItemPrice: ListHooks<Lists.CartItem.TypeInfo>['resolveInput'] = async ({
    context,
    item,
    resolvedData
}) => {
    const newData = { price: 0 };

    const subscriptionId = item?.subscriptionId || resolvedData.subscription?.connect?.id;

    if (subscriptionId) {
        const subscription = await context.query.Subscription.findOne({
            where: { id: `${subscriptionId}` },
            query: `price`
        });
        newData.price += subscription.price;
    }

    const serviceId = item?.serviceId || resolvedData.service?.connect?.id;

    if (serviceId) {
        const service = await context.query.Service.findOne({
            where: { id: `${serviceId}` },
            query: `price`
        });
        newData.price += service.price;
    }

    if (!item?.price && !resolvedData.price) {
        return {
            ...resolvedData,
            ...newData
        };
    }

    return {
        ...resolvedData
    };
};
