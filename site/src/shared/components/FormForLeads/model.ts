import { createEvent, createStore } from "effector";

export const setFormLeadData = createEvent<string>();
export const resetFormLeadData = createEvent();

export const $formLeadData = createStore<string>('')
    .on(setFormLeadData, (_, value) => value)
    .reset(resetFormLeadData);
