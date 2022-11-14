import * as React from 'react';
import { FC } from 'react';
import { UserSubscription } from '@src/shared/lib/apollo/types';
import { Subscription } from './Subscription';
import { Stack } from '@mui/material';

export const WidgetSubscription: FC<{ userSubscriptions: UserSubscription[] }> = ({ userSubscriptions }) => {
    return (
        <Stack gap={2}>
            {userSubscriptions.map((subscription) => (
                <Subscription key={subscription.id} subscription={subscription} />
            ))}
        </Stack>
    );
};
