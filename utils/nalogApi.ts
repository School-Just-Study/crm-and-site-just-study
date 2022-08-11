import { NalogApi } from "lknpd-nalog-api";
import { NALOG_INN, NALOG_PASSWORD } from "../config";

export const addRecent = async (
  amount: number
): Promise<string | undefined> => {
  try {
    const nalogApi = new NalogApi({
      inn: NALOG_INN,
      password: NALOG_PASSWORD,
    });

    return await nalogApi.addIncome({
      name: `Консультационные услуги`,
      amount,
      quantity: 1,
    });
  } catch (e) {
    console.log(e);
  }
};

export const cancelRecent = async (id: string) => {
  try {
    const nalogApi = new NalogApi({
      inn: NALOG_INN,
      password: NALOG_PASSWORD,
    });

    await nalogApi.cancelIncome(id, "Платеж отменен");
  } catch (e) {
    console.log(e);
  }
};