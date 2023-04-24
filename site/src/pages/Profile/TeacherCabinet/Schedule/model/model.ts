import { createEvent, createStore, restore } from 'effector';
import { GetTeacherScheduleData } from './types';
import { GetTeacherScheduleResponse } from '@src/shared/lib/apollo/types';

export const setScheduleParams = createEvent<GetTeacherScheduleData>();
export const againGetScheduleParams = createEvent();

export const $scheduleParams = restore(setScheduleParams, {
    start: new Date(),
    end: new Date()
});

export const $schedule = createStore<GetTeacherScheduleResponse | null>(null);
