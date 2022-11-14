import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import locale from 'date-fns/locale/ru';

/**
 * Преобразазует дату в текстовый формат с временем
 * Пример: Сегодня в 12:45, Вчера в 18:01, 1 февраля в 12:45
 * @param date
 */
export const dateFormatWithTimeToString = (date: Date) => {
    let formatted = format(date, 'd MMMM в HH:mm', { locale });

    if (isTomorrow(date)) {
        formatted = `Завтра, в ${format(date, 'HH:mm', { locale })}`;
    }
    if (isToday(date)) {
        formatted = `Сегодня, в ${format(date, 'HH:mm', { locale })}`;
    }
    if (isYesterday(date)) {
        formatted = `Вчера, в ${format(date, 'HH:mm', { locale })}`;
    }
    return formatted;
};
