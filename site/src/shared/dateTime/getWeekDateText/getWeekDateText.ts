import { add, format, getDate, getMonth, parseISO, startOfWeek } from 'date-fns';
import locale from 'date-fns/locale/ru';
import { getWeekRange } from '@shared/dateTime';

/**
 * Возвращает название диапазона недели для компонента просмотра недельного графика.
 */
export const getWeekDateText = (weekDate: string) => {
    const date = parseISO(weekDate);
    const { startWeekDate, endWeekDate } = getWeekRange(date);

    const startDateMonth = getMonth(startWeekDate);
    const endDateMonth = getMonth(endWeekDate);

    if (startDateMonth === endDateMonth) {
        return `${getDate(startWeekDate)} — ${format(endWeekDate, 'd MMMM', {
            locale
        })}`;
    }

    return `${format(startWeekDate, 'd MMMM', { locale })} — ${format(endWeekDate, 'd MMMM', { locale })}`;
};

/**
 * Возвращает boolean значение по номеру дня в недели сегодня или нет.
 */
export const getToday = (dayOfWeek: number) => {
    const today = new Date();
    const currentWeek = startOfWeek(today, { locale, weekStartsOn: 1 });
    const currentDay = add(currentWeek, { days: --dayOfWeek as Day });
    return format(currentDay, 'ddMMyyyy') === format(today, 'ddMMyyyy');
};
