import { ListHooks } from '@keystone-6/core/types';
import { Lists } from '.keystone/types';
import { Lesson } from '@src/src/shared/lib/apollo/types';
import { Statuses } from '../../../enums/statuses.enum';

export const handleSetSubscriptionIfEmpty: ListHooks<Lists.Lesson.TypeInfo>['resolveInput'] = async ({
    resolvedData,
    item,
    context,
    operation
}) => {
    const subscriptionId = resolvedData?.subscription?.connect?.id || item?.subscriptionId;
    // @ts-ignore
    let usersId = resolvedData?.students?.connect[0].id;

    if (operation === 'update') {
        const lesson = (await context.query.Lesson.findOne({
            where: { id: `${item?.id}` },
            query: `students { id }`
        })) as Lesson;
        usersId = lesson.students?.[0].id;
    }

    if (!subscriptionId) {
        const userSubscriptions = await context.query.UserSubscription.findMany({
            where: { status: { equals: Statuses.Active }, student: { id: { equals: usersId } } },
            orderBy: { beginDate: 'asc' },
            query: `id`
        });

        if (userSubscriptions.length) {
            return {
                ...resolvedData,
                subscription: { connect: { id: Number(userSubscriptions[0].id) } }
            };
        }
    }

    return resolvedData;
};
