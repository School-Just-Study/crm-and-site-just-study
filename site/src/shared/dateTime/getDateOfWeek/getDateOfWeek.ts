import getISODay from 'date-fns/getISODay';

/**
 * По году и номеру недели возвращает дату внутри этой недели. Нумерация недель начинается с 1.
 * Если 1 января это не пн, то эта неделя считается последней неделей прошлого года.
 */
export const getDateOfWeek = (week: number, year: number) => {
    const is1stWeek = getISODay(new Date(year, 0, 1)) <= 4;
    const shift = is1stWeek ? 1 : 0;

    const day = 1 + (week - shift) * 7;

    return new Date(year, 0, day);
};
