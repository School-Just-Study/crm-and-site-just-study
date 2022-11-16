import { Currency } from '@shared/enums/currency.enum';
import { CartItem } from '@shared/lib/apollo/types';

export interface CartItemProps {
    item: CartItem;
    currency: Currency;
    hideImage?: boolean;
}
