import { WorKCalendarForm } from '@src/pages/Profile/TeacherCabinet/WorkTime/types';

export const columns = [{ title: 'День недели' }, { title: 'Режим' }, { title: 'Время' }, { title: '' }];

export const defaultWorkTime: WorKCalendarForm = {
    workTime: [
        { dayOfWeek: 1, startTime: '09:00', endTime: '22:00', isDayOff: false },
        { dayOfWeek: 2, startTime: '09:00', endTime: '22:00', isDayOff: false },
        { dayOfWeek: 3, startTime: '09:00', endTime: '22:00', isDayOff: false },
        { dayOfWeek: 4, startTime: '09:00', endTime: '22:00', isDayOff: false },
        { dayOfWeek: 5, startTime: '09:00', endTime: '22:00', isDayOff: false },
        { dayOfWeek: 6, isDayOff: true },
        { dayOfWeek: 0, isDayOff: true }
    ]
};
