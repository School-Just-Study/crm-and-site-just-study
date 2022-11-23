import { CartItem } from '@shared/lib/apollo/types';

export interface CartItemProps {
    item: CartItem;
    hideImage?: boolean;
}
