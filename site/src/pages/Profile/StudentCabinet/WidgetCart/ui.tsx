import * as React from 'react';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { CartItem as CartItemProps } from '@src/shared/lib/apollo/types';
import PaymentIcon from '@mui/icons-material/Payment';
import { useTheme } from '@mui/material/styles';
import { Currency } from '@shared/enums/currency.enum';
import { FormContainer } from 'react-hook-form-mui';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { transition } from '@shared/lib/transition';
import { cartPage } from '@translations/cartPage';
import Routes from '@src/routes';
import { ICartForm } from '@src/pages/Checkout/Cart/types';
import { CartItem } from '@src/pages/Checkout/Cart/CartItem';
import { CurrencyAmount } from '@shared/components/CurrencyAmount';

export const WidgetCart = () => {
    const user = useUnit($user);
    const theme = useTheme();
    const { locale } = useRouter();
    const formContext = useForm<ICartForm>({ defaultValues: { language: locale } });
    const { setValue, handleSubmit } = formContext;
    const t = transition(cartPage, locale);

    if (!user?.cart) {
        return null;
    }

    const onSubmit = handleSubmit(async (data) => {
        window.open(`${Routes.checkoutStudentAccount}?currency=${data.currency}&email=${user.email}`, '_blank');
    });

    const userCart = user.cart;

    return (
        <Card raised sx={{ p: 2 }}>
            <Stack direction="row" gap={2} mb={2} alignItems="center">
                <Box bgcolor={theme.palette.warning.main} borderRadius="50%" p={1} display="flex" height="100%">
                    <PaymentIcon sx={{ color: 'white' }} fontSize="medium" />
                </Box>
                <Typography fontWeight="bold">Оплатите новый заказ</Typography>
            </Stack>
            <FormContainer formContext={formContext} handleSubmit={onSubmit}>
                <Stack gap={1}>
                    {userCart.items?.map((item: CartItemProps) => (
                        <CartItem item={item} key={item.id} hideImage />
                    ))}
                    {userCart.quantityPayments !== 1 && (
                        <Typography mt={2}>
                            {t.quantityPayments} {userCart.quantityPayments} шт.
                        </Typography>
                    )}
                    <Stack gap={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography fontWeight="bold">Сумма:</Typography>
                            <CurrencyAmount amount={userCart.amount!} amountUSD={userCart.amountUSD!} variant="body1" />
                        </Box>
                        <Stack gap={2} direction={{ xs: 'column', sm: 'row' }} width="100%">
                            {locale === 'ru' && (
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    onClick={() => setValue('currency', Currency.RUB)}>
                                    {t.submitButtonRUB}
                                </Button>
                            )}
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={() => setValue('currency', Currency.USD)}>
                                {t.submitButtonUSD}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </FormContainer>
        </Card>
    );
};
