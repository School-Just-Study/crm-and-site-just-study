import { NalogApi } from 'lknpd-nalog-api';
import { NALOG_INN, NALOG_PASSWORD } from '../config';

export const addRecent = async (amount: number, orderId?: number): Promise<string | undefined> => {
    if (process.env.SKIP_NALOG === 'true') return 'test_recent_id';

    try {
        const nalogApi = new NalogApi({
            inn: NALOG_INN,
            password: NALOG_PASSWORD
        });

        return await nalogApi.addIncome({
            name: `Консультационные услуги, заказ: ${orderId}`,
            amount,
            quantity: 1
        });
    } catch (e) {
        console.log(e);
    }
};

export const cancelRecent = async (id: string) => {
    if (process.env.SKIP_NALOG === 'true') return;

    try {
        const nalogApi = new NalogApi({
            inn: NALOG_INN,
            password: NALOG_PASSWORD
        });

        await nalogApi.cancelIncome(id, 'Платеж отменен');
    } catch (e) {
        console.log(e);
    }
};
