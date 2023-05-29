import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { LessonStatus } from '../enum';
import { ViewStatus } from '../../../enums/view-status.enum';
import {
    addDays,
    addHours,
    addMinutes,
    areIntervalsOverlapping,
    eachMinuteOfInterval,
    getDay,
    isAfter,
    isBefore
} from 'date-fns';
import { generateIntervalsWithCheck } from '../schedule/utils';

interface Arguments {
    date: string;
    teacherId: string;
    duration?: number;
}

interface AllBlockTimesType {
    startTime: string;
    endTime: string;
}

export const unavailableTimesForRecordLesson = async (
    root: any,
    { data }: { data: Arguments },
    context: KeystoneContext
) => {
    const { date, teacherId, duration = 60 } = data;
    const allBlockTimes: AllBlockTimesType[] = [];

    const lessons = await context.query.Lesson.findMany({
        where: {
            statusLesson: { equals: LessonStatus.Created },
            teachers: { some: { id: { equals: teacherId } } },
            startTime: { gte: addDays(new Date(date), -1) },
            endTime: { lte: addDays(new Date(date), 1) }
        },
        query: `startTime endTime`
    });
    allBlockTimes.push(...(lessons as AllBlockTimesType[]));

    const cutoff = await context.query.WorkTimeCutoff.findMany({
        where: {
            manager: { id: { equals: teacherId } },
            statusView: { equals: ViewStatus.Show }
        },
        query: `startTime endTime`
    });
    allBlockTimes.push(...(cutoff as AllBlockTimesType[]));

    const dayOfWeek = getDay(new Date(date));

    const workTimeTeacher = await context.query.WorkTime.findMany({
        where: {
            manager: { id: { equals: teacherId } },
            dayOfWeek: { equals: dayOfWeek }
        },
        query: `id isDayOff startTime endTime manager { timeZone }`
    });
    const schedule = workTimeTeacher[0];

    if (schedule.isDayOff) {
        return [];
    }

    const workTime = generateIntervalsWithCheck(
        dayOfWeek,
        new Date(date),
        schedule.startTime,
        schedule.endTime,
        schedule.manager.timeZone
    );

    const generateIntervals = eachMinuteOfInterval(workTime, { step: 30 });
    const generateTimeSlots = generateIntervals.map((time) => {
        return {
            start: time,
            end: addMinutes(time, duration)
        };
    });

    return generateTimeSlots
        .filter((slot) => {
            return !allBlockTimes.some((blockSlot) =>
                areIntervalsOverlapping(
                    { start: new Date(slot.start), end: new Date(slot.end) },
                    {
                        start: new Date(blockSlot.startTime),
                        end: new Date(blockSlot.endTime)
                    }
                )
            );
        })
        .filter((slot) => !isAfter(new Date(slot.end), workTime.end))
        .filter((slot) => !isBefore(new Date(slot.start), addHours(new Date(), 2)));
};
