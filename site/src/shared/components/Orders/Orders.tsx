import * as React from 'react';
import { FC } from 'react';
import Divider from '@mui/material/Divider';
import { Card, Stack, Typography } from '@mui/material';
import { Order } from '@src/shared/lib/apollo/types';
import { useQuery } from '@apollo/client';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { OrderItem } from '@shared/components/Orders/OrderItem';
import { transition } from '@src/shared/lib/transition';
import { cartPage } from '@translations/cartPage';
import { useRouter } from 'next/router';
import { QUERY_STUDENT_CABINET } from '@shared/components/Orders/query';

export interface IOrders {
    orders: Order[];
}

export const Orders: FC<{ userId: string }> = ({ userId }) => {
    const { locale } = useRouter();
    const t = transition(cartPage, locale);
    const { data, loading } = useQuery<IOrders>(QUERY_STUDENT_CABINET, {
        variables: { userId }
    });

    return (
        <SpinnerWrapper loading={loading}>
            {data?.orders && data.orders.length > 0 && (
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        py: { xs: 3, md: 6 },
                        px: { xs: 2, md: 6 }
                    }}>
                    <Stack gap={3}>
                        <Typography variant="h2">🏁 {t.orderTitle}</Typography>
                        <Divider />
                        {data?.orders.map((order) => (
                            <OrderItem key={order.id} order={order} />
                        ))}
                    </Stack>
                </Card>
            )}
        </SpinnerWrapper>
    );
};
