import { Currency } from '@shared/enums/currency.enum';
import { Language } from '@shared/enums/language.enum';

export const getTextCurrency = (currency: Currency | string) => {
    switch (currency) {
        case Currency.RUB:
            return `₽`;
        default:
            return '$';
    }
};

export const getCurrencyForLanguage = (language: Language | string) => {
    switch (language) {
        case Language.Russian:
            return `₽`;
        default:
            return '$';
    }
};
