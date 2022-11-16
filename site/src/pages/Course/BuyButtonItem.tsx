import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { Subscription } from '@src/shared/lib/apollo/types';
import routes from '@src/routes';
import Link from '@shared/ui/Link';
import { Button, Stack } from '@mui/material';
import { useUnit } from 'effector-react/effector-react.umd';
import { $user } from '@shared/storage/user';
import { $cartItems, setCartItem } from '@src/pages/Checkout/Cart/model';

export const BuyButtonItem: FC<{ subscription: Subscription }> = ({ subscription }) => {
    const { id, trial } = subscription;
    const cartItems = useUnit($cartItems);
    const user = useUnit($user);
    const [isAdded, setIsAdded] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setIsAdded(
            cartItems?.some((item) => item.subscriptionId === id) ||
                user?.cart?.items?.some((item) => item.subscription?.id === id)
        );
    }, [cartItems, id, user?.cart?.items]);

    const price = trial ? 499 : undefined;

    const handleAddProduct = async () => {
        setCartItem({ subscriptionId: id, price });
        setIsAdded(true);
    };

    const buttonText = isAdded ? '✅ Добавлено' : `Оплатить`;

    return (
        <Stack direction="row" gap={2} alignItems="center">
            <Button
                key={id}
                sx={{ px: 3 }}
                variant="contained"
                size="large"
                onClick={handleAddProduct}
                disabled={isAdded}>
                {buttonText}
            </Button>
            {isAdded && <Link href={routes.checkout}>Перейти в корзину</Link>}
        </Stack>
    );
};
