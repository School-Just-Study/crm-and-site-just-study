import { createEvent, restore } from 'effector';
import { SettingsEventType } from './types';

export const setSettingsEvent = createEvent<SettingsEventType>();
export const resetSettingsEvent = createEvent();

export const $settingsEvent = restore(setSettingsEvent, null).reset(resetSettingsEvent);
