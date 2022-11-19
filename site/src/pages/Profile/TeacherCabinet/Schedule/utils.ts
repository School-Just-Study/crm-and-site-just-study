import { WorkTime } from '@src/shared/lib/apollo/types';
import { BusinessHoursInput, EventInput, EventSourceInput } from '@fullcalendar/react';
import { formatDateToTimeString } from '@shared/dateTime';
import { LessonStatus } from '@shared/enums/lesson-status';
import { EventType, ScheduleData } from '@src/pages/Profile/TeacherCabinet/Schedule/types';
import { formatTimeWithTimeZoneToDate } from '@shared/dateTime/formatTimeWithTimeZoneToDate';

const formatDateForString = (time: string, timeZone: string) => {
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
        };
    });
    events.push(...(lessons as EventInput[]));

    const cutoff = data.cutoff?.map(({ id, startTime, endTime, title }) => {
        return {
            id,
            title: title || 'Перерыв',
            start: startTime,
            end: endTime,
            color: '#A0AAB4',
            type: EventType.Cutoff
        };
    });
    events.push(...(cutoff as EventInput[]));

    return events;
};
