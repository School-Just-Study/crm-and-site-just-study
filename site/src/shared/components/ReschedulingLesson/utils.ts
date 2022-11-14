import { LessonUpdateInput } from '@src/shared/lib/apollo/types';
import { addMinutes } from 'date-fns';
import { ReschedulingLessonForm } from './types';
import jstz from 'jstz';

export const formatDataUpdateLesson = (data: ReschedulingLessonForm): LessonUpdateInput => {
    return {
        statusLesson: 'created',
        startTime: data.startTime,
        endTime: addMinutes(data.startTime, data.duration),
        timeZone: jstz.determine().name(),
        notified: false
    };
};
