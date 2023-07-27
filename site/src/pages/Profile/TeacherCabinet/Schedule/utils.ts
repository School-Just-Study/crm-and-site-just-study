import { WorkTime } from '@src/shared/lib/apollo/types';
import { BusinessHoursInput, EventInput, EventSourceInput } from '@fullcalendar/core';
import { formatDateToTimeString } from '@shared/dateTime';
import { LessonStatus } from '@shared/enums/lesson-status';
import { EventType, ScheduleData } from '@src/pages/Profile/TeacherCabinet/Schedule/types';
import { formatTimeWithTimeZoneToDate } from '@shared/dateTime/formatTimeWithTimeZoneToDate';

export const formatDateForString = (time: string, timeZone: string) => {
    const dateWithTimeZone = formatTimeWithTimeZoneToDate(time, timeZone);
    return formatDateToTimeString(dateWithTimeZone);
};

export const formatBusinessHours = (workTime: WorkTime[], timeZone = 'Europe/Moscow'): BusinessHoursInput => {
    return workTime.map(({ isDayOff, dayOfWeek, startTime, endTime }) => {
        if (isDayOff) {
            return {
                daysOfWeek: [dayOfWeek],
                startTime: '00:00',
                endTime: '00:00'
            };
        }
        return {
            daysOfWeek: [dayOfWeek],
            startTime: formatDateForString(startTime as string, timeZone),
            endTime: formatDateForString(endTime as string, timeZone)
        };
    });
};

const colorEvent = (status: LessonStatus) => {
    switch (status) {
        case LessonStatus.Created:
            return '#4f71ff';
        case LessonStatus.Completed:
            return '#1DB45A';
        case LessonStatus.Draft:
            return '#3E5060';
    }
};

export const formatSchedule = (data: ScheduleData): EventSourceInput => {
    const events: EventSourceInput = [];

    const lessons = data.lessons?.map(({ id, startTime, endTime, statusLesson, students, burned }) => {
        const title = students?.map(({ name }) => name).join(', ');
        return {
            id,
            interactive: true,
            start: startTime,
            end: endTime,
            title: title,
            color: colorEvent(statusLesson as LessonStatus),
            type: EventType.Lesson,
            borderColor: burned ? '#cd242f' : undefined
        } as EventSourceInput;
    });
    events.push(...(lessons as EventInput[]));

    const cutoff = data.cutoff?.map(({ id, startTime, endTime, uid }) => {
        return {
            id,
            title: uid === 'manual' ? 'Перерыв (ручной)' : 'Перерыв (из календаря)',
            start: startTime,
            end: endTime,
            color: uid === 'manual' ? '#2f2f31' : '#A0AAB4',
            type: EventType.Cutoff
        } as EventSourceInput;
    });
    events.push(...(cutoff as EventInput[]));

    return events;
};
