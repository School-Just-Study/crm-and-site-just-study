import { getDay } from 'date-fns';

export const shouldDisableDate = (date: Date | undefined, cutoffDays?: number[]) => {
    if (!cutoffDays) return false;
    if (!date) return false;
    const dayOfWeek = getDay(date);
    return cutoffDays.includes(dayOfWeek);
};
