import { Lesson, WorkTimeCutoff } from '@src/shared/lib/apollo/types';

export interface ScheduleData {
    lessons?: Lesson[];
    cutoff?: WorkTimeCutoff[];
}

export enum EventType {
    Lesson = 'lesson',
    Cutoff = 'cutoff'
}
