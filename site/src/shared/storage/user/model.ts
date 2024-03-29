import { combine, createEvent, createStore, restore } from 'effector';
import { User } from '@src/shared/lib/apollo/types';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';
import { $cartItems } from '@src/pages/Checkout/Cart/model/model';

export const logout = createEvent();
export const userReset = createEvent();
export const setAuthToken = createEvent<string>();
export const updateDataUser = createEvent();

export const $user = createStore<User | null>(null).reset(userReset);
export const $isUserAuthorized = $user.map((user) => user !== null);

export const setEmailAuth = createEvent<string>();

export const resetEmail = createEvent();
export const $email = restore(setEmailAuth, '').reset(resetEmail);

export const $authToken = restore(setAuthToken, '');
persist({ store: $email, key: 'email' });

export const $showCartIcon = combine($user, $cartItems, (user, cartItem) =>
    Boolean(user?.cart?.items?.length || cartItem.length)
);

export const CheckAuthGate = createGate();
