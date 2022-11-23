import { TypographyProps } from '@mui/material';

export interface CurrencyAmountProps extends TypographyProps {
    amount: number;
    amountUSD: number;
    discount?: number;
    discountUSD?: number;
}
