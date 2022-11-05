import { LessonStatus } from "../enums/lesson-status";

export const LessonStatusOptions = [
  { label: "📝Черновик", value: LessonStatus.Draft },
  { label: "🧑🏼‍🏫Запланирован", value: LessonStatus.Created },
  { label: "✅Проведен", value: LessonStatus.Completed },
  { label: "🗑️Отменен", value: LessonStatus.Canceled },
];
