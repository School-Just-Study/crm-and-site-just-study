import { endOfWeek, startOfWeek } from 'date-fns';
import locale from 'date-fns/locale/ru';

/**
 * Возвращает объект с датами первого и последнего дня недели для даты date.
 */
export const getWeekRange = (date: Date) => {
    const startWeekDate = startOfWeek(date, { locale });
    const endWeekDate = endOfWeek(date, { locale });

    return { startWeekDate, endWeekDate };
};
