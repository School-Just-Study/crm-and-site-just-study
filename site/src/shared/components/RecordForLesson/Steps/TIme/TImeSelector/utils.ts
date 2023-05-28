import { format } from 'date-fns';

export const formatTimes = (time: string) => {
    return format(new Date(time), 'H:mm');
};
