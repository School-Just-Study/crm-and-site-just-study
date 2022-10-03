import { Lists } from ".keystone/types";
import { ListHooks } from "@keystone-6/core/types";
import { LessonStatus } from "../enums/lesson-status";
import { notifyLessonCanceled } from "../notifications/notifyLessonCanceled";

export const handleNotificationStudentAndTeacherDeleteLesson: ListHooks<Lists.Lesson.TypeInfo>["resolveInput"] =
  async ({ context, item, operation, resolvedData }) => {
    if (
      operation === "update" &&
      resolvedData.statusLesson === LessonStatus.Canceled
    ) {
      notifyLessonCanceled(item.id, context);

      return resolvedData;
    }
    return resolvedData;
  };
