import { Lists } from '.keystone/types';
import { ListHooks } from '@keystone-6/core/types';
import { LessonStatus } from '../enums/lesson-status';
import { areIntervalsOverlapping } from 'date-fns';
import { Lesson, WorkTimeCutoff } from '@src/src/shared/lib/apollo/types';
import { ViewStatus } from '../enums/view-status.enum';

export const handleCheckBookingLesson: ListHooks<Lists.Lesson.TypeInfo>['validateInput'] = async ({
    context,
    resolvedData,
    addValidationError,
    item
}) => {
    if (resolvedData?.startTime || resolvedData?.endTime) {
        const lessons = (await context.query.Lesson.findMany({
            where: {
                ...(item?.id && { id: { not: { equals: `${item?.id}` } } }),
                statusLesson: { equals: LessonStatus.Created }
            },
            query: `startTime endTime teachers { id }`
        })) as Lesson[];

        for (const { startTime, endTime, teachers } of lessons) {
            const teachersId = teachers?.map(({ id }) => id);

            const timeCutoff = (await context.query.WorkTimeCutoff.findMany({
                where: {
                    manager: { id: { in: teachersId } },
                    statusView: { equals: ViewStatus.Show }
                },
                query: `startTime endTime`
            })) as WorkTimeCutoff[];

            const checkCutoff = timeCutoff.some((cutoff) => {
                return areIntervalsOverlapping(
                    { start: new Date(cutoff.startTime), end: new Date(cutoff.endTime) },
                    {
                        start: new Date(resolvedData.startTime as string),
                        end: new Date(resolvedData.endTime as string)
                    }
                );
            });

            const invalidTime = areIntervalsOverlapping(
                { start: new Date(startTime), end: new Date(endTime) },
                {
                    start: new Date(resolvedData.startTime as string),
                    end: new Date(resolvedData.endTime as string)
                }
            );

            if (invalidTime || checkCutoff) {
                return addValidationError('Time is not available');
            }
        }
    }
};
