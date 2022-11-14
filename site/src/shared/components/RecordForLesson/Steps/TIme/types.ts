import { WorkTime } from '@src/shared/lib/apollo/types';

export type GetScheduleToday = Pick<WorkTime, 'isDayOff' | 'startTime' | 'endTime'>;

export interface TimeProps {
    noFilter?: boolean;
}
