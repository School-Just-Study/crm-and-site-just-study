import * as React from 'react';
import { FC } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useStore, useUnit } from 'effector-react';
import { $cartItems } from '@src/pages/Checkout/Cart/model/model';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormContainer } from 'react-hook-form-mui';
import { ContactForm } from '@src/pages/Checkout/Cart/ContactForm';
import { LoadingButton } from '@mui/lab';
import { IAuthCartData } from './types';
import { formatForm } from '@src/pages/Checkout/Cart/MakingOrder/lib';
import { authForCartFx, updateUserCartFx } from '@src/pages/Checkout/Cart/model';

export const MakingOrder: FC = () => {
    const cart = useStore($cartItems);
    const { locale } = useRouter();
    const formContext = useForm<IAuthCartData>({ defaultValues: { language: locale } });
    const { handleSubmit } = formContext;
    const loading = useUnit(authForCartFx.pending || updateUserCartFx.pending);

    const onSubmit = handleSubmit(async (data) => {
        const formatData = formatForm(data);
        await authForCartFx(formatData);
    });

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
                    <LoadingButton
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                        size="large"
                        loading={loading}
                        disabled={loading}>
                        Подтвердить
                    </LoadingButton>
                </FormContainer>
            </Stack>
        </Card>
    );
};
