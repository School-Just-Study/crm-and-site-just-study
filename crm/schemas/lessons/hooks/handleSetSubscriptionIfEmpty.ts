import { ListHooks } from '@keystone-6/core/types';
import { Lesson } from '@src/src/shared/lib/apollo/types';
import { Statuses } from '../../../enums/statuses.enum';
import { Lists } from '.keystone/types';

export const handleSetSubscriptionIfEmpty: ListHooks<Lists.Lesson.TypeInfo>['resolveInput'] = async ({
    resolvedData,
    item,
    context,
    operation
}) => {
    let subscriptionIds = resolvedData?.subscriptions?.connect;
    let usersIds = resolvedData?.students?.connect;

    if (operation === 'update') {
        const lesson = (await context.query.Lesson.findOne({
            where: { id: `${item?.id}` },
            query: `students { id } subscriptions { id }`
        })) as Lesson;
        subscriptionIds = lesson?.subscriptions as [];
        usersIds = lesson?.students as [];
    }

    // @ts-ignore
    if (!subscriptionIds?.length || subscriptionIds?.length !== usersIds?.length) {
        const idsForSubs = [];
        for (const user of usersIds as Lists.User.Item[]) {
            const userSubscriptions = await context.query.UserSubscription.findMany({
                where: { status: { equals: Statuses.Active }, student: { id: { equals: `${user.id}` } } },
                orderBy: { beginDate: 'asc' },
                query: `id`
            });

            if (userSubscriptions.length) {
                idsForSubs.push({ id: Number(userSubscriptions[0].id) });
            }
        }

        return {
            ...resolvedData,
            subscriptions: {
                connect: idsForSubs
            }
        };
    }

    return resolvedData;
};
