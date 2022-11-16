import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';

export const setActiveStep = createEvent<number>();
export const nextActiveStep = createEvent();
export const previousActiveStep = createEvent();
export const resetActiveStep = createEvent();

export const ActiveStepGate = createGate();

export const $activeStep = createStore(0)
    .on(setActiveStep, (_, value) => value)
    .on(previousActiveStep, (value) => value - 1)
    .on(nextActiveStep, (value) => value + 1)
    .reset(resetActiveStep);
