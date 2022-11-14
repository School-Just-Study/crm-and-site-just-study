import { ReactDatePickerProps } from 'react-datepicker';
import { addMinutes, isAfter, isPast } from 'date-fns';

export const filterTime: ReactDatePickerProps['filterTime'] = (time) => {
    const minTimeBooking = addMinutes(new Date(), 60);
    if (!isAfter(time, minTimeBooking)) return isAfter(time, minTimeBooking);
    return !isPast(time) || isAfter(time, minTimeBooking);
};
