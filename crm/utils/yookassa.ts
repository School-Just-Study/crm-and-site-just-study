import { YooCheckout } from '@a2seven/yoo-checkout';
import { YOOKASSA_SECRET, YOOKASSA_SHOPID } from '../config';

export const yooKassa = new YooCheckout({
  shopId: YOOKASSA_SHOPID,
  secretKey: YOOKASSA_SECRET,
});
