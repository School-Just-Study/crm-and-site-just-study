import { Box, Card, Stack, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { getTextCurrency } from '@src/shared/lib/currency';
import { LoadingButton } from '@mui/lab';
import * as React from 'react';
import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { cartPage } from '@translations/cartPage';
import { Order } from '@src/shared/lib/apollo/types';
import Routes from '@src/routes';

export const OrderItem: FC<{ order: Order }> = ({ order }) => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(cartPage, locale);

    const handlePay = () => window.open(`${Routes.payStudentAccount}?orderid=${order.id}`, '_blank');

    const currency = order.currency;
    const quantityPayments = order.quantityPayments;

    return (
        <Card raised sx={{ p: 2 }}>
            <Stack direction="row" gap={2}>
                <Box bgcolor={theme.palette.warning.main} borderRadius="50%" p={1} display="flex" height="100%">
                    <PaymentIcon sx={{ color: 'white' }} fontSize="medium" />
                </Box>
                <Stack alignItems="flex-start">
                    <Typography fontWeight="bold">Завершите оплату:</Typography>
                    <Typography>{order.label}</Typography>
                    {quantityPayments !== 1 && (
                        <Typography>
                            {t.quantityPayments} {quantityPayments} шт.
                        </Typography>
                    )}
                    <Typography>
                        Уже оплачено: {order.payed}
                        {getTextCurrency(currency as string)}, осталось оплатить {order.dept}
                        {getTextCurrency(currency as string)}
                    </Typography>
                    <Stack direction="row" gap={1}>
                        <Typography color={theme.palette.primary.main} fontWeight="bold">
                            {t.amount} {order.nextPayment}
                            {getTextCurrency(currency as string)}
                        </Typography>
                    </Stack>
                    <LoadingButton sx={{ mt: 1, px: 3 }} variant="contained" onClick={handlePay}>
                        Оплатить {order.nextPayment} {getTextCurrency(currency as string)}
                    </LoadingButton>
                </Stack>
            </Stack>
        </Card>
    );
};
