import * as React from 'react';
import { FC, useEffect } from 'react';
import { useStore, useUnit } from 'effector-react';
import { $cartItems, setCartItem } from '@shared/components/Cart/model/model';
import { CartItemCreateInput, Subscription } from '@src/shared/lib/apollo/types';
import { useSnackbar } from 'notistack';
import routes from '@src/routes';
import { gql, useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { $user } from '@shared/storage/user';

export const MUTATION_CREATE_CART_ITEM = gql`
    mutation ($data: CartItemCreateInput!) {
        createCartItem(data: $data) {
            id
        }
    }
`;

export const BuyButtonItem: FC<{ subscription: Subscription }> = ({ subscription }) => {
    const { id, trial } = subscription;
    const cart = useStore($cartItems);
    const { enqueueSnackbar } = useSnackbar();
    const user = useUnit($user);
    const [createCartItem, { loading, error, data }] = useMutation(MUTATION_CREATE_CART_ITEM);
    const { push } = useRouter();

    const price = trial ? 499 : undefined;

    const handleAdd = async () => {
        if (!user) {
            setCartItem({ subscriptionId: id, price });
        } else {
            const cartItem: CartItemCreateInput = {
                cart: { connect: { id: user?.cart?.id } },
                subscription: { connect: { id: id } },
                price
            };
            await createCartItem({ variables: { data: cartItem } });
        }
        await push(routes.checkout);
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar('Произошла ошибка при добавлении товара', { variant: 'error' });
        }
    }, [enqueueSnackbar, error]);

    const isAdded = Boolean(data?.createCartItem?.id) || cart.some((item) => item.subscriptionId === id);
    const buttonText = isAdded ? '✅ Добавлено' : `Оплатить`;

    return (
        <LoadingButton
            key={id}
            sx={{ px: 3 }}
            variant="contained"
            size="large"
            onClick={() => handleAdd()}
            disabled={isAdded}
            loading={loading}>
            {buttonText}
        </LoadingButton>
    );
};
