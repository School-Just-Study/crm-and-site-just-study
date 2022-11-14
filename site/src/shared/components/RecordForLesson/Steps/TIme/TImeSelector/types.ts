import { UnavailableTimesForRecordLessonResponse } from '@src/shared/lib/apollo/types';

export interface UnavailableTimesRes {
    unavailableTimesForRecordLesson?: UnavailableTimesForRecordLessonResponse[];
}

export interface TimeSelectorProps extends UnavailableTimesRes {
    startTime: string;
    endTime: string;
    noFilter?: boolean;
}
