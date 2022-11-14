import * as React from 'react';
import { FC } from 'react';
import { Product } from '@src/shared/lib/apollo/types';
import { BuyButtonItem } from '@src/pages/Course/BuyButtonItem';

export const BuyButton: FC<{ product: Product }> = ({ product }) => {
    const { subscriptions } = product;

    return (
        <>
            {subscriptions &&
                subscriptions?.length > 0 &&
                subscriptions.map((subscription) => (
                    <BuyButtonItem key={subscription.id} subscription={subscription} />
                ))}
        </>
    );
};
