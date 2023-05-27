import * as process from 'process';

export const SERVER_PORT = parseInt(process.env.PORT!) || 8000;

export const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:root@localhost:8889/sitejuststudy';

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
export const BACKEND_URL = process.env.BACKEND_URL || 'localhost:8000';

export const NALOG_INN = process.env.NALOG_INN || 0;
export const NALOG_PASSWORD = process.env.NALOG_PASSWORD || '';

export const SESSION_SECRET = process.env.SESSION_SECRET || 'e21bada5-a1a1-4114-81fd-487be3ad6fca';

export const SERVICE_KEY_ID = process.env.SERVICE_KEY_ID || '';
export const SERVICE_KEY_SECRET = process.env.SERVICE_KEY_SECRET || '';

export const PAYTURE_URL = process.env.PAYTURE_URL || 'https://sandbox3.payture.com';
export const PAYTURE_TERMINAL_RUB = process.env.PAYTURE_TERMINAL_RUB || 'MerchantJustStudyRUB';
export const PAYTURE_TERMINAL_USD = process.env.PAYTURE_TERMINAL_USD || 'MerchantJustStudyUSD';
export const PAYTURE_TERMINAL_PASSWORD = process.env.PAYTURE_TERMINAL_PASSWORD || '123';

export const YOOKASSA_SHOPID = process.env.YOOKASSA_ID || '933369';
export const YOOKASSA_SECRET = process.env.YOOKASSA_SECRET || 'test_Wg58Q3yezKSNYZLwcj5wg0otQq4yi0_yCVgUdbM3sB0';

export const IS_PROD = process.env.NODE_ENV === 'production';
