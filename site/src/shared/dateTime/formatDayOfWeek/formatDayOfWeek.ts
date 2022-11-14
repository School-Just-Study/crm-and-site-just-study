type ICaseWord = 'nominative' | 'accusative';

/**
 * Возвращает полное название дня недели
 * @param day - день недели
 * @param caseWord - падеж (по умолчанию именительный)
 */
export const formatDayOfWeek = (day: number | string, caseWord?: ICaseWord) => {
    let dayOfWeek = [];
    switch (caseWord) {
        case 'accusative': {
            dayOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среду', 'Четверг', 'Пятницу', 'Субботу'];
            break;
        }
        default: {
            dayOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            break;
        }
    }
    return dayOfWeek[+day];
};
