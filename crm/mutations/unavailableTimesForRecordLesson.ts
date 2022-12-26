import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { LessonStatus } from '../enums/lesson-status';
import { ViewStatus } from '../enums/view-status.enum';
import { addDays, areIntervalsOverlapping } from 'date-fns';

interface Arguments {
    date: string;
    teacherId: string;
}

export const unavailableTimesForRecordLesson = async (
    root: any,
    { data }: { data: Arguments },
    context: KeystoneContext
) => {
    const { date, teacherId } = data;
    const allTimes = [];

    const lessons = await context.query.Lesson.findMany({
        where: {
            statusLesson: { equals: LessonStatus.Created },
            teachers: { some: { id: { equals: teacherId } } }
        },
        query: `startTime endTime`
    });
    allTimes.push(...lessons);

    const cutoff = await context.query.WorkTimeCutoff.findMany({
        where: {
            manager: { id: { equals: teacherId } },
            statusView: { equals: ViewStatus.Show }
        },
        query: `startTime endTime`
    });
    allTimes.push(...cutoff);

    return allTimes.filter(({ startTime, endTime }) =>
        areIntervalsOverlapping(
            { start: new Date(date), end: addDays(new Date(date), 1) },
            { start: new Date(startTime), end: new Date(endTime) }
        )
    );
};
