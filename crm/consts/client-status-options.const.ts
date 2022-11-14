import { ClientStatus } from '../enums/client-status.emum';

export const ClientStatusOptionsConst = [
  { label: "🎉Новый", value: ClientStatus.New },
  { label: "☎️Первый звонок принят", value: ClientStatus.FirstCall },
  {
    label: "📝Запись на первый урок",
    value: ClientStatus.RecordFirstLesson,
  },
  { label: "🙏🏻Пробный урок", value: ClientStatus.TrialLesson },
  {
    label: "🤔Принимает решение после пробного",
    value: ClientStatus.DecisionAfterTrialLesson,
  },
  { label: "⬇️Некачественный лид", value: ClientStatus.LowQualityLead },
  { label: "✅Клиент", value: ClientStatus.Client },
  { label: "🏁Закончил обучение", value: ClientStatus.FinishedClient },
  { label: "😴Неактивный клиент", value: ClientStatus.DisabledClient },
  { label: "🙅‍♂️Отказ", value: ClientStatus.Rejection },
];
