import { combine, createEvent, createStore, restore } from "effector";
import { User } from "@src/shared/lib/apollo/types";
import { createGate } from "effector-react";
import { persist } from "effector-storage/local";

export const logout = createEvent();
export const userReset = createEvent();
export const setAuthToken = createEvent<string>();
export const updateDataUser = createEvent();

export const $user = createStore<User | null>(null).reset(userReset);
export const $isUserAuthorized = combine($user, (user) => user !== null);

export const setEmailAuth = createEvent<string>();

export const resetEmail = createEvent();
export const $email = restore(setEmailAuth, '').reset(resetEmail);

export const $authToken = restore(setAuthToken, '');
persist({ store: $email, key: 'email' });

export const CheckAuthGate = createGate();
