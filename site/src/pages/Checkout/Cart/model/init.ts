import { sample } from 'effector';
import { authForCartFx, updateUserCartFx } from '@src/pages/Checkout/Cart/model/effects';
import { $isUserAuthorized, $user, setEmailAuth, updateDataUser } from '@shared/storage/user';
import { $cartItems, CartGate, resetCartItem } from '@src/pages/Checkout/Cart/model/model';
import { CartItemCreateInput } from '@shared/lib/apollo/types';

sample({
    clock: authForCartFx.doneData,
    fn: ({ data }) => data!.authCart.email,
    target: setEmailAuth
});

sample({
    clock: [$isUserAuthorized, CartGate.open],
    source: { cartItems: $cartItems, user: $user },
    filter: ({ cartItems, user }) => Boolean(cartItems.length > 0 && user),
    fn: ({ cartItems, user }) => {
        const data: CartItemCreateInput[] = cartItems.map((item) => {
            return {
                cart: { connect: { id: user?.cart?.id } },
                subscriptions: { connect: [{ id: item.subscriptionId }] },
                price: item.price
            };
        });
        return data;
    },
    target: [updateUserCartFx, resetCartItem]
});

sample({
    clock: updateUserCartFx.doneData,
    target: updateDataUser
});
