import * as React from 'react';
import { FC, useEffect } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useStore, useUnit } from 'effector-react';
import { $cartItems, resetCartItem } from '@shared/components/Cart/model/model';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormContainer } from 'react-hook-form-mui';
import { ContactForm } from '@shared/components/Cart/ContactForm';
import { useMutation } from '@apollo/client';
import { CartItemCreateInput, Client } from '@src/shared/lib/apollo/types';
import { MUTATION_AUTH_FOR_CART, MUTATION_CREATE_CART_ITEMS } from '@shared/components/Cart/graphql';
import { LoadingButton } from '@mui/lab';
import { $user, setEmailAuth } from '@shared/storage/user';
import { IAuthCartData } from './types';
import { formatForm } from '@shared/components/Cart/MakingOrder/lib';

export const MakingOrder: FC = () => {
    const cart = useStore($cartItems);
    const { locale } = useRouter();
    const user = useUnit($user);
    const formContext = useForm<IAuthCartData>({ defaultValues: { language: locale } });
    const { handleSubmit } = formContext;
    const [authCart, { loading: authCartLoading }] = useMutation<{ authCart: Client }>(MUTATION_AUTH_FOR_CART);
    const [updateCart, { loading: updateCartLoading }] = useMutation<{
        createCartItems: CartItemCreateInput[];
    }>(MUTATION_CREATE_CART_ITEMS);
    const loading = authCartLoading || updateCartLoading;

    const onSubmit = handleSubmit(async (data) => {
        const formatData = formatForm(data);
        await authCart({ variables: { data: formatData } }).then((res) => {
            if (res.data?.authCart) {
                setEmailAuth(res.data?.authCart.email as string);
            }
        });
    });

    useEffect(() => {
        if (user) {
            const updateCartUser = async () => {
                const cartItems: CartItemCreateInput[] = cart.map((item) => {
                    return {
                        cart: { connect: { id: user?.cart?.id } },
                        subscription: { connect: { id: item.subscriptionId } },
                        price: item.price
                    };
                });

                await updateCart({ variables: { data: cartItems } }).then((res) => {
                    if (res.data?.createCartItems) {
                        resetCartItem();
                    }
                });
            };

            updateCartUser();
        }
    }, [cart, updateCart, user]);

    if (cart.length === 0) return null;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: { xs: 3, md: 6 },
                px: { xs: 2, md: 6 }
            }}>
            <Stack gap={3}>
                <Typography variant="h1" mb={{ xs: 1, md: 3 }} style={{ wordBreak: 'break-word' }}>
                    Оформление заказа
                </Typography>
                <Divider />
                <FormContainer formContext={formContext} handleSubmit={onSubmit}>
                    <ContactForm />
                    <LoadingButton sx={{ mt: 3 }} type="submit" variant="contained" size="large" loading={loading}>
                        Подтвердить
                    </LoadingButton>
                </FormContainer>
            </Stack>
        </Card>
    );
};
