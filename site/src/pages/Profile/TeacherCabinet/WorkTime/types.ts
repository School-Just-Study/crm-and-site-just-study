import { WorkTime } from '@src/shared/lib/apollo/types';

export interface WorKCalendarForm {
    workTime: Partial<Pick<WorkTime, 'dayOfWeek' | 'startTime' | 'endTime' | 'isDayOff' | 'id'>>[];
}
