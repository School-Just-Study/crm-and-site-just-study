import { formatTimeFromString } from '@shared/dateTime';
import { zonedTimeToUtc } from 'date-fns-tz';
import { addDays, isAfter } from 'date-fns';

export const formatTimeWithTimeZoneToDate = (time: string, timeZone: string): Date => {
    const timeToDate = formatTimeFromString(time);
    const dateWithTimeZone = zonedTimeToUtc(timeToDate, timeZone);

    if (!isAfter(dateWithTimeZone, timeToDate)) {
        return addDays(dateWithTimeZone, 1);
    }
    return dateWithTimeZone;
};
