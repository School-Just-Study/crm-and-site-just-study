/**
 * Получить массив часов в указанном интервале
 * @param interval: Интервал между интервалами
 * @param isAddEndTime Нужно ли добавить в конец 24:00
 * @param beginTime с какого часа начать отчет?
 */
export function getTimeHoursRanges(interval: number, isAddEndTime?: boolean, beginTime?: number) {
    const ranges = [];
    const date = new Date();

    let beginWithHour = 0;
    if (beginTime) {
        beginWithHour = Math.floor(beginTime) * 60;
    }

    for (let minutes = beginWithHour; minutes < 24 * 60; minutes += interval) {
        date.setHours(0);
        date.setMinutes(minutes);
        ranges.push(date.toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric' }));
    }

    if (isAddEndTime) ranges.push('24:00');

    return ranges;
}
