import { formatTimeFromString } from '@shared/dateTime';
import { zonedTimeToUtc } from 'date-fns-tz';
import { isSameDay } from 'date-fns';

export const formatTimeWithTimeZoneToDate = (time: string, timeZone: string): Date => {
    const timeToDate = formatTimeFromString(time);
    const dateWithTimeZone = zonedTimeToUtc(timeToDate, timeZone);
    if (!isSameDay(dateWithTimeZone, timeToDate)) {
        const newDate = new Date();
        newDate.setHours(23, 59);
        return newDate;
    }
    return dateWithTimeZone;
};
