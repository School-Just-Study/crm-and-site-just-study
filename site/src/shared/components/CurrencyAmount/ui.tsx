import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { CurrencyAmountProps } from './types';
import { useRouter } from 'next/router';

export const CurrencyAmount: FC<CurrencyAmountProps> = ({ amount, amountUSD, discount, discountUSD, ...props }) => {
    const theme = useTheme();
    const { locale } = useRouter();

    const colorUSD = locale === 'ru' ? theme.palette.grey.A400 : theme.palette.text.primary;

    const isDiscount = discount && discount !== amount;
    const isDiscountUSD = discountUSD && discountUSD !== amountUSD;

    return (
        <Stack direction="row" gap={1}>
            {locale === 'ru' && (
                <>
                    {/*// @ts-ignore*/}
                    <Typography variant="h6" component={isDiscount ? 'del' : 'p'} {...props}>
                        {amount} ₽
                    </Typography>
                    {discount && isDiscount && (
                        <Typography variant="h6" {...props} fontWeight="bold">
                            {discount} ₽
                        </Typography>
                    )}{' '}
                    <Typography variant="h6" color={theme.palette.grey.A400} {...props}>
                        /
                    </Typography>
                </>
            )}
            {/*// @ts-ignore*/}
            <Typography variant="h6" component={isDiscountUSD ? 'del' : 'p'} color={colorUSD} {...props}>
                {amountUSD} $
            </Typography>
            {discountUSD && isDiscountUSD && (
                <Typography variant="h6" color={colorUSD} {...props} fontWeight="bold">
                    {discountUSD} $
                </Typography>
            )}
        </Stack>
    );
};
