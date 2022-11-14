import { createEvent, restore } from "effector";

export const DEFAULT_MAX_TIME_RECORD = 0;

export const setMaxTimeForRecord = createEvent<number>();

export const $maxTimeForRecord = restore(setMaxTimeForRecord, DEFAULT_MAX_TIME_RECORD);
