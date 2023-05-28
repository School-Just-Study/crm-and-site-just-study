import { Lists } from '.keystone/types';
import { KeystoneContextFromListTypeInfo, ListHooks } from '@keystone-6/core/types';
import { LessonStatus } from '../enum';
import { areIntervalsOverlapping } from 'date-fns';
import { Lesson, WorkTimeCutoff } from '@src/src/shared/lib/apollo/types';
import { ViewStatus } from '../../../enums/view-status.enum';

const checkAvailableTime = async (
    context: KeystoneContextFromListTypeInfo<Lists.Lesson.TypeInfo>,
    itemId?: number,
    initStartTime?: Lesson['startTime'],
    initEndTime?: Lesson['endTime'],
    teachersId?: string[]
) => {
    const lessons = (await context.query.Lesson.findMany({
        where: {
            ...(itemId && { id: { not: { equals: `${itemId}` } } }),
            statusLesson: { equals: LessonStatus.Created },
            teachers: { some: { id: { in: teachersId } } }
        },
        query: `startTime endTime`
    })) as Lesson[];

    const timeCutoff = (await context.query.WorkTimeCutoff.findMany({
        where: {
            manager: { id: { in: teachersId } },
            statusView: { equals: ViewStatus.Show }
        },
        query: `startTime endTime id`
    })) as WorkTimeCutoff[];

    for (const { startTime, endTime } of lessons) {
        const checkCutoff = timeCutoff.some((cutoff) => {
            return areIntervalsOverlapping(
                { start: new Date(cutoff.startTime), end: new Date(cutoff.endTime) },
                {
                    start: new Date(initStartTime as string),
                    end: new Date(initEndTime as string)
                }
            );
        });

        const invalidTime = areIntervalsOverlapping(
            { start: new Date(startTime), end: new Date(endTime) },
            {
                start: new Date(initStartTime as string),
                end: new Date(initEndTime as string)
            }
        );

        if (invalidTime || checkCutoff) {
            return true;
        }
    }
    return false;
};

export const handleCheckBookingLesson: ListHooks<Lists.Lesson.TypeInfo>['validateInput'] = async ({
    context,
    resolvedData,
    addValidationError,
    item,
    operation
}) => {
    /**
     * Проверяем корректность времени
     */

    const initStartTime = resolvedData.startTime || item?.startTime;
    const initEndTime = resolvedData.endTime || item?.endTime;

    let teachersId: string[];

    if (operation === 'create') {
        // @ts-ignore
        teachersId = resolvedData.teachers?.connect?.map(({ id }) => id);
    } else {
        const lesson = (await context.query.Lesson.findOne({
            where: { id: `${item.id}` },
            query: `teachers { id }`
        })) as Lesson;
        teachersId =
            // @ts-ignore
            resolvedData.teachers?.connect?.map(({ id }) => id) || lesson.teachers?.map(({ id }) => id) || [];
    }

    const error = await checkAvailableTime(context, item?.id, initStartTime, initEndTime, teachersId);
    if (error) addValidationError('Time is not available');

    /**
     * Проверяем наличие абонемента для завершения урока
     */

    if (resolvedData.statusLesson === LessonStatus.Completed && !item?.subscriptionId)
        addValidationError('The student does not have an active subscription');

    if (resolvedData.statusLesson === LessonStatus.Completed && item?.subscriptionId) {
        const lastLessonsOfSub = await context.query.UserSubscription.findOne({
            where: { id: `${item.subscriptionId}` },
            query: `lastCount`
        });
        if (lastLessonsOfSub.lastCount === 0)
            addValidationError("The student's subscription has run out of available lessons");
    }
};
