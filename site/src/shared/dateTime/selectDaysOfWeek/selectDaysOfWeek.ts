import { eachDayOfInterval, getDay } from 'date-fns';

import { formatGetDay } from '../formatGetDay';

/**
 * Возвращает массив дней недели из выбранного периода
 * @param start
 * @param end
 */
export const selectDaysOfWeek = (start: Date, end: Date) => {
    const range = eachDayOfInterval({ start, end });
    const dates: number[] = [];
    range.forEach((day) => {
        dates.push(formatGetDay(getDay(day)));
    });

    return Array.from(new Set(dates)).sort();
};
