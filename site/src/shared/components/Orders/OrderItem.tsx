import * as React from 'react';
import { FC, useEffect } from 'react';
import { Alert, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { Order, PaymentResponse } from '@src/shared/lib/apollo/types';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { transition } from '@src/shared/lib/transition';
import { cartPage } from '@translations/cartPage';
import { MUTATION_GET_PAY } from '@shared/components/Orders/query';
import { CurrencyAmount } from '../CurrencyAmount';
import { Currency } from '@shared/enums/currency.enum';

export const OrderItem: FC<{ order: Order }> = (props) => {
    const { id, label, quantityPayments, nextPayment, amount, amountUSD, nextPaymentUSD, leftPayments } = props.order;
    const theme = useTheme();
    const { locale, push } = useRouter();
    const t = transition(cartPage, locale);
    const [pay, { loading, error, data }] = useMutation<{ payment: PaymentResponse }>(MUTATION_GET_PAY);

    useEffect(() => {
        if (data?.payment.status) {
            push(data.payment.redirectUrl);
        }
    }, [data, error, loading, push]);

    return (
        <Card
            key={id}
            sx={{
                display: 'flex',
                gap: 3,
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A100
            }}>
            <Stack gap={1} m={3} alignItems="flex-start">
                <Typography variant="h5" fontWeight="bold">
                    {label}
                </Typography>
                {quantityPayments && quantityPayments > 1 && (
                    <Typography fontSize="larger">
                        {t.quantityPayments} {quantityPayments}
                    </Typography>
                )}
                <Stack direction="row" gap={1}>
                    <Typography fontWeight="bold" fontSize="larger">
                        {t.amount}
                    </Typography>
                    <CurrencyAmount amount={amount!} amountUSD={amountUSD!} fontWeight="bold" />
                </Stack>
                {error && <Alert severity="error">{t.errorMessage}</Alert>}
                <Stack gap={2} direction={{ xs: 'column', sm: 'row' }}>
                    {locale === 'ru' && (
                        <LoadingButton
                            variant="contained"
                            onClick={() => pay({ variables: { orderId: id, currency: Currency.RUB } })}
                            loading={loading}>
                            Оплатить {nextPayment} ₽ картой 🇷🇺 Российского банка
                        </LoadingButton>
                    )}
                    <LoadingButton
                        variant="contained"
                        onClick={() => pay({ variables: { orderId: id, currency: Currency.USD } })}
                        loading={loading}>
                        Pay {nextPaymentUSD} $
                    </LoadingButton>
                </Stack>
            </Stack>
        </Card>
    );
};
