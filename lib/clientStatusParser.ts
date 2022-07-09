import { ClientStatus } from "../enums/client-status.emum";

export const clientStatusParser = (type: string) => {
  switch (type) {
    case "Клиент":
      return ClientStatus.Client;
    case "Пробное":
      return ClientStatus.TrialLesson;
    case "Новый":
      return ClientStatus.New;
    case "Первый звонок принят":
      return ClientStatus.FirstCall;
    case "Запись на пробное занятие":
      return ClientStatus.RecordFirstLesson;
    case "Принимает решение после пробного":
      return ClientStatus.DecisionAfterTrialLesson;
    case "Некачественный лид":
      return ClientStatus.LowQualityLead;
    case "Неактивный клиент":
      return ClientStatus.DisabledClient;
    case "Отказ":
    default:
      return ClientStatus.Rejection;
  }
};
