import { Currency } from "../enums/currency.enum";

export const USD_COURSE = 55;

export const convertMoney = (
  amount: number,
  currency: Currency | string
): number => {
  return currency === Currency.RUB ? amount : Math.floor(amount / USD_COURSE);
};

export const reConvertMoney = (
  amount: number,
  currency: Currency | string
): number => {
  return currency === Currency.RUB ? amount : amount * USD_COURSE;
};
