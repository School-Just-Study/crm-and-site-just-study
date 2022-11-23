import { Box, Button, Card, Stack, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import * as React from 'react';
import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { cartPage } from '@translations/cartPage';
import { Order } from '@src/shared/lib/apollo/types';
import Routes from '@src/routes';
import { CurrencyAmount } from '@shared/components/CurrencyAmount';
import { Currency } from '@shared/enums/currency.enum';

export const OrderItem: FC<{ order: Order }> = ({ order }) => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(cartPage, locale);

    const quantityPayments = order.quantityPayments;

    return (
        <Card raised sx={{ p: 2 }}>
            <Stack direction="row" gap={2}>
                <Box bgcolor={theme.palette.warning.main} borderRadius="50%" p={1} display="flex" height="100%">
                    <PaymentIcon sx={{ color: 'white' }} fontSize="medium" />
                </Box>
                <Stack gap={1} alignItems="flex-start">
                    <Typography fontWeight="bold">Завершите оплату:</Typography>
                    <Typography>{order.label}</Typography>
                    {quantityPayments !== 1 && (
                        <Typography>
                            {t.quantityPayments} {quantityPayments} шт.
                        </Typography>
                    )}
                    <Stack direction="row" gap={1}>
                        <Typography fontWeight="bold">{t.amount}</Typography>
                        <CurrencyAmount amount={order.amount!} amountUSD={order.amountUSD!} variant="body1" />
                    </Stack>
                    <Stack gap={2} direction={{ xs: 'column', sm: 'row' }}>
                        {locale === 'ru' && (
                            <Button
                                variant="contained"
                                onClick={() =>
                                    window.open(
                                        `${Routes.payStudentAccount}?orderid=${order.id}&currency=${Currency.RUB}`,
                                        '_blank'
                                    )
                                }>
                                Оплатить {order.nextPayment} ₽ картой 🇷🇺 Российского банка
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            onClick={() =>
                                window.open(
                                    `${Routes.payStudentAccount}?orderid=${order.id}&currency=${Currency.USD}`,
                                    '_blank'
                                )
                            }>
                            Pay {order.nextPaymentUSD} $
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
};
