import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";

export interface ICartItem {
    subscriptionId: string;
    price?: number;
}

export const setCartItem = createEvent<ICartItem>();
export const resetCartItem = createEvent();

export const $cartItems = createStore<ICartItem[] | []>([])
    .on(setCartItem, (current, value) => [...current, value])
    .reset(resetCartItem);

persist({ store: $cartItems, key: 'cartItems' });
