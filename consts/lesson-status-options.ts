import { LessonStatus } from "../enums/lesson-status";

export const LessonStatusOptions = [
  { label: LessonStatus.Draft, value: LessonStatus.Draft },
  { label: LessonStatus.Created, value: LessonStatus.Created },
  { label: LessonStatus.Completed, value: LessonStatus.Completed },
  { label: LessonStatus.Canceled, value: LessonStatus.Canceled },
];
