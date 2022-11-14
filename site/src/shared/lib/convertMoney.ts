import { Currency } from '@shared/enums/currency.enum';

export const USD_COURSE = 50;

export const convertMoney = (amount: number, currency: Currency | string): number => {
    return currency === Currency.RUB ? amount : Math.ceil(amount / USD_COURSE);
};

export const reConvertMoney = (amount: number, currency: Currency | string): number => {
    return currency === Currency.RUB ? amount : amount * USD_COURSE;
};
