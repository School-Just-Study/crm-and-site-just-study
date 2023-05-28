import { addDays, addWeeks, isBefore, isFuture, set, setDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { localeDate } from '../../../lib/localeDate';

export const checkActive = (endPeriod?: Date | null | undefined) => {
    if (endPeriod) isFuture(new Date(endPeriod));
    return true;
};

export const formatWithDateHourMinutes = (dayOfWeek: number, date: Date, time: string, timeZone?: string) => {
    const [hr, min] = time.split(':').map(Number);
    const setDate = setDay(date, dayOfWeek);
    const dateWithTime = set(setDate, { hours: hr, minutes: min, seconds: 0, milliseconds: 0 });
    if (timeZone) return zonedTimeToUtc(dateWithTime, timeZone, { locale: localeDate('ru') });
    return dateWithTime;
};

export const generateIntervalsWithCheck = (
    dayOfWeek: number,
    date: Date,
    startTime: string,
    endTime: string,
    timeZone?: string
) => {
    const start = formatWithDateHourMinutes(dayOfWeek, new Date(date), startTime, timeZone);
    const end = formatWithDateHourMinutes(dayOfWeek, new Date(date), endTime, timeZone);
    if (isBefore(end, start)) {
        return {
            start,
            end: addDays(end, 1)
        };
    }
    return {
        start,
        end
    };
};

export const daysForRepeat = [
    addWeeks(new Date(), 0),
    addWeeks(new Date(), 1),
    addWeeks(new Date(), 2),
    addWeeks(new Date(), 3)
];
