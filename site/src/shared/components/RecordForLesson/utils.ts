import { LessonForm } from '@shared/components/RecordForLesson/types';
import { LessonCreateInput, User, UserSubscription } from '@src/shared/lib/apollo/types';
import jstz from 'jstz';

export const formatDataCreateLesson = (
    data: LessonForm,
    user: User,
    subscriptions?: UserSubscription[]
): LessonCreateInput => {
    let lastSubscription = undefined;
    if (subscriptions) lastSubscription = subscriptions[0];

    return {
        statusLesson: 'created',
        startTime: data.startTime,
        endTime: data.endTime,
        teachers: { connect: [{ id: data.teacher.id }] },
        students: { connect: [{ id: user.id }] },
        subscriptions: { connect: [{ id: lastSubscription?.id }] },
        timeZone: jstz.determine().name()
    };
};
