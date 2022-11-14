import { LessonForm } from '@shared/components/RecordForLesson/types';
import { LessonCreateInput, User, UserSubscription } from '@src/shared/lib/apollo/types';
import { addMinutes } from 'date-fns';
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
        endTime: addMinutes(data.startTime, data.duration),
        teachers: { connect: [{ id: data.teacher.id }] },
        students: { connect: [{ id: user.id }] },
        subscription: { connect: { id: lastSubscription?.id } },
        timeZone: jstz.determine().name()
    };
};
