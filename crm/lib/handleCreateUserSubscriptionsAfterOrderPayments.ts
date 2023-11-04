import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { Lists } from '.keystone/types';
import { Statuses } from '../enums/statuses.enum';
import { addDays } from 'date-fns';

export const handleCreateUserSubscriptionsAfterOrderPayments: ListHooks<Lists.Order.TypeInfo>['afterOperation'] =
    async ({ context, item, operation }) => {
        if (operation !== 'delete') {
            const order = await context.query.Order.findOne({
                where: { id: `${item.id}` },
                query: `payed subscriptions { id status period }`
            });

            if (order.payed !== 0) {
                const sub = order.subscriptions.filter(
                    (subscription: Lists.UserSubscription.Item) => subscription.status === Statuses.Inactive
                );

                for (const subscription of sub) {
                    await context.query.UserSubscription.updateOne({
                        where: { id: `${subscription.id}` },
                        data: {
                            status: Statuses.Active,
                            beginDate: new Date(),
                            endDate: addDays(new Date(), subscription.period)
                        }
                    });
                }
            }
        }
    };
