import { add, format } from 'date-fns';

/**
 * Конвертирует время форматов "hh:mm:ss", "hh:mm", "hh" в секунды.
 * Если передано отрицательное значение, то вернет отрицательную величину.
 */
export const timeToSeconds = (time: string) => {
    const [h = 0, m = 0, s = 0] = time.split(':')?.map((e) => +e) || [];

    return h * 3600 + m * 60 + s;
};

/**
 * Переводит время в секундах во время в формате format
 */
export const secondsToTime = (seconds: number, timeFormat = 'h:mm:ss') => {
    const date = add(new Date(2000, 1, 1), { seconds });

    return format(date, timeFormat);
};

/**
 * Складывает 2 значения времени и возвращает разницу.
 * Работает с отрицательными значениями времени time2
 * при условии что результат будет положительным
 */
export const addTime = (time1: string, time2: string) => {
    return secondsToTime(timeToSeconds(time1) - timeToSeconds(time2));
};

export const formatDateToTimeString = (date: Date) => {
    return format(date, 'HH:mm');
};
