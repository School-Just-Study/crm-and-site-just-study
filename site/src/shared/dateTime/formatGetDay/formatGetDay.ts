/**
 * Для корректного отображения дня недели
 * @param day
 */
export const formatGetDay = (day: number) => {
    let formattedDay = day;
    if (day === 0) {
        formattedDay = 7;
    }
    return formattedDay;
};
