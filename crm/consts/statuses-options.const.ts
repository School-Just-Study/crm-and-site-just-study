import { Statuses } from '../enums/statuses.enum';

export const StatusesOptions = [
  { label: "😴Неактивный", value: Statuses.Inactive },
  { label: "🦄Активный", value: Statuses.Active },
  { label: "🥶Заморожен", value: Statuses.Frozen },
  { label: "🏁Завершен", value: Statuses.Finished },
];
