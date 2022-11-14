import { createEvent, createStore } from 'effector';
import { PaletteMode } from '@mui/material';

export const setTheme = createEvent<PaletteMode>();

export const $theme = createStore<PaletteMode>('light').on(setTheme, (_, value) => value);
