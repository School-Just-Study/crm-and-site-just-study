import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { UserSubscriptionUpdateInput } from '.keystone/types';
import { addDays } from 'date-fns';

export const updateUserSub = async (context: KeystoneContext) => {
    const allSubscriptions = await context.query.UserSubscription.findMany({
        query: `id beginDate period`
    });

    const updateSubscription = async (id: string, data: UserSubscriptionUpdateInput) => {
        const sub = await context.query.UserSubscription.updateOne({
            where: { id },
            data,
            query: 'id'
        });
        console.log(`✅Updated subscription ${sub.id}`);
    };

    for (const subscription of allSubscriptions) {
        console.log(`👩 current subscription: ${subscription['id']}`);

        const endDate = addDays(new Date(subscription.beginDate), subscription.period);

        const data: UserSubscriptionUpdateInput = {
            endDate: endDate
        };
        await updateSubscription(subscription.id, data);
    }
};
