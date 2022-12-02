import * as React from 'react';
import { FC, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { Alert, Box, Card, Stack, Typography } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';
import { useRouter } from 'next/router';
import { transition } from '@shared/lib/transition';
import { useForm } from 'react-hook-form';
import { cartPage } from '@translations/cartPage';
import { Currency } from '@shared/enums/currency.enum';
import { CartItem } from '@src/pages/Checkout/Cart/CartItem';
import { PaymentResponse } from '@shared/lib/apollo/types';
import { useMutation } from '@apollo/client';
import { ICartForm } from '@src/pages/Checkout/Cart/types';
import { MUTATION_CART } from '@src/pages/Checkout/Cart/graphql';
import { LoadingButton } from '@mui/lab';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { formatForm } from '@src/pages/Checkout/Cart/lib';
import { ClientDetails } from './ClientDetails';
import { CurrencyAmount } from '@shared/components/CurrencyAmount';

export const Cart: FC = () => {
    const { locale, push } = useRouter();
    const user = useUnit($user);
    const formContext = useForm<ICartForm>({ defaultValues: { language: locale, agree: ['1', '2'] } });
    const { handleSubmit, setValue } = formContext;
    const t = transition(cartPage, locale);
    const [sendCart, { loading, error, data }] = useMutation<{ cart: PaymentResponse }>(MUTATION_CART);

    const onSubmit = handleSubmit(async (data) => {
        const formatData = formatForm(data);
        await sendCart({ variables: { data: formatData } });
    });

    useEffect(() => {
        if (data?.cart?.status) {
            push(data.cart.redirectUrl);
        }
    }, [data, error, loading, push]);

    if (!user?.cart && !user?.cart?.items) {
        return null;
    }

    const userCart = user.cart;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: { xs: 3, md: 6 },
                px: { xs: 2, md: 6 }
            }}>
            <Stack gap={2}>
                <Typography variant="h2" style={{ wordBreak: 'break-word' }}>
                    💳 {t.title}
                </Typography>
                <Divider />
                <Stack gap={2}>
                    {userCart.items?.map((item) => (
                        <CartItem item={item} key={item.id} />
                    ))}
                    <Divider />
                    <FormContainer formContext={formContext} handleSubmit={onSubmit}>
                        <Stack gap={1}>
                            <ClientDetails />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h6">{t.amount}</Typography>
                                <CurrencyAmount amount={userCart.amount!} amountUSD={userCart.amountUSD!} />
                            </Box>
                            {userCart?.quantityPayments !== 1 && (
                                <>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="h6">{t.quantityPayments}</Typography>
                                        <Typography variant="h6">{userCart?.quantityPayments} шт.</Typography>
                                    </Box>

                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="h6">К оплате</Typography>
                                        <CurrencyAmount
                                            amount={userCart.nextPayment!}
                                            amountUSD={userCart.nextPaymentUSD!}
                                        />
                                    </Box>
                                </>
                            )}

                            {error && <Alert severity="error">{t.errorMessage}</Alert>}
                            <Stack gap={2} direction={{ xs: 'column', sm: 'row' }} width="100%">
                                {locale === 'ru' && (
                                    <LoadingButton
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        onClick={() => setValue('currency', Currency.RUB)}
                                        loading={loading}>
                                        {t.submitButtonRUB}
                                    </LoadingButton>
                                )}
                                <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    onClick={() => setValue('currency', Currency.USD)}
                                    loading={loading}>
                                    {t.submitButtonUSD}
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </FormContainer>
                </Stack>
            </Stack>
        </Card>
    );
};
