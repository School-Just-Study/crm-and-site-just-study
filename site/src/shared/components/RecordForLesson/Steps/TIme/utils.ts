import { Manager, UnavailableTimesForRecordLessonResponse } from '@src/shared/lib/apollo/types';
import { addMinutes, eachMinuteOfInterval, getDay, isSameDay } from 'date-fns';
import { GetScheduleToday } from '@shared/components/RecordForLesson/Steps/TIme/types';
import { formatTimeWithTimeZoneToDate } from '@shared/dateTime/formatTimeWithTimeZoneToDate';

export const getScheduleToday = (
    schedule: Manager['workTime'],
    date: Date,
    timeZone: string
): GetScheduleToday | undefined => {
    const dayNumber = getDay(date);
    const workTime = schedule?.filter((day) => day.dayOfWeek === dayNumber)[0];

    if (workTime) {
        const startTime = formatTimeWithTimeZoneToDate(workTime.startTime as string, timeZone).toISOString();
        const endTime = formatTimeWithTimeZoneToDate(workTime.endTime as string, timeZone).toISOString();

        return {
            ...workTime,
            startTime,
            endTime
        };
    }
};

export const getExcludeTimes = (cutoff: UnavailableTimesForRecordLessonResponse[], date: Date) => {
    const dates: Date[] = [];

    cutoff?.forEach(({ startTime, endTime }) => {
        const interval = eachMinuteOfInterval(
            {
                start: new Date(startTime),
                end: addMinutes(new Date(endTime), -1)
            },
            { step: 30 }
        );
        dates.push(...interval);
    });

    return dates.filter((dateLeft) => isSameDay(dateLeft, date));
};
