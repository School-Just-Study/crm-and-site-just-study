import { Lists } from ".keystone/types";
import { ListHooks } from "@keystone-6/core/types";
import { notifyNewLesson } from "../notifications/notifyLessons";
import { LessonStatus } from "../enums/lesson-status";

export const handleNotificationStudentAndTeacherLesson: ListHooks<Lists.Lesson.TypeInfo>["afterOperation"] =
  async ({ context, item, operation }) => {
    if (operation === "create" && item.statusLesson === LessonStatus.Created) {
      await notifyNewLesson(item.id, context);
    }
  };
