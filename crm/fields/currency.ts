import { select } from '@keystone-6/core/fields';
import { currencyOptions } from '../consts/currency-options.const';
import { Currency } from '../enums/currency.enum';

export const currency = select({
    options: currencyOptions,
    defaultValue: Currency.RUB,
    ui: { displayMode: 'segmented-control', itemView: { fieldMode: 'read' } },
    label: 'Терминал',
    validation: { isRequired: true }
});
