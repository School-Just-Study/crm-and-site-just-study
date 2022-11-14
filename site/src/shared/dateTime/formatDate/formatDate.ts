import { format } from 'date-fns';
import locale from 'date-fns/locale/ru';

export const formatToStandart = (date: Date) => format(date, 'dd MMMM yyyy', { locale });

/**
 * Возвращает сокращенное название дня недели
 * @param date
 */
export function viewDate(date: Date) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return `${`0${date.getDate()}`.slice(-2)}.${`0${date.getMonth() + 1}`.slice(
        -2
    )}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}, ${days[date.getDay()]}`;
}
