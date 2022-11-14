import { format } from 'date-fns';

export const formatShortDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
};
