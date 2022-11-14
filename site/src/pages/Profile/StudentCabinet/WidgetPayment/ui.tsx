import * as React from 'react';
import { FC } from 'react';
import { OrderItem } from './OrderItem';
import { Stack } from '@mui/material';
import { Order } from '@src/shared/lib/apollo/types';

export const WidgetPayment: FC<{ orders: Order[] }> = ({ orders }) => {
    return (
        <Stack gap={2}>
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </Stack>
    );
};
