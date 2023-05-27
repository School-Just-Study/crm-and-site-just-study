import { addWeeks, isFuture, set, setDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const checkActive = (endPeriod?: Date | null | undefined) => {
    if (endPeriod) isFuture(new Date(endPeriod));
    return true;
};

export const formatWithDateHourMinutes = (dayOfWeek: number, date: Date, time: string, timeZone: string) => {
    const [hr, min] = time.split(':').map(Number);
    const setDate = setDay(date, dayOfWeek);
    const dateWithTime = set(setDate, { hours: hr, minutes: min, seconds: 0, milliseconds: 0 });
    return utcToZonedTime(dateWithTime, timeZone);
};

export const daysForRepeat = [addWeeks(new Date(), 0), addWeeks(new Date(), 1), addWeeks(new Date(), 2)];
