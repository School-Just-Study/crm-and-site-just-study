import * as React from "react";
import { FC, useEffect } from "react";
import { Alert, Card, Stack, Typography } from "@mui/material";
import { getTextCurrency } from "@src/shared/lib/currency";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import { Order, PaymentResponse } from "@src/shared/lib/apollo/types";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { transition } from "@src/shared/lib/transition";
import { cartPage } from "@translations/cartPage";
import { MUTATION_GET_PAY } from "@shared/components/Orders/query";

export const OrderItem: FC<{ order: Order }> = (props) => {
    const { id, label, quantityPayments, nextPayment, amount, currency } = props.order;
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
                    <Typography color={theme.palette.primary.main} fontWeight="bold" fontSize="larger">
                        {t.amount} {amount}
                        {getTextCurrency(currency as string)}
                    </Typography>
                </Stack>
                {error && <Alert severity="error">{t.errorMessage}</Alert>}
                <LoadingButton
                    variant="contained"
                    onClick={() => pay({ variables: { orderId: id } })}
                    loading={loading}>
                    Оплатить {nextPayment} {getTextCurrency(currency as string)}
                </LoadingButton>
            </Stack>
        </Card>
    );
};
