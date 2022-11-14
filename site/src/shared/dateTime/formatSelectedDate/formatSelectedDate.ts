import { getYear, parseISO } from 'date-fns';

/**
 * Форматирование выбранной даты в year calendar
 * @param year
 * @param selectedYearDate
 */
export const formatSelectedDate = (year: number, selectedYearDate: string | null) => {
    const selectedDateParsed = selectedYearDate && parseISO(selectedYearDate);
    return selectedDateParsed && getYear(selectedDateParsed) === year ? selectedDateParsed : null;
};
