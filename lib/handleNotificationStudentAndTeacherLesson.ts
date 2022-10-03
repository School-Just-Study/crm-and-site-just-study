import { Lists } from ".keystone/types";
import { ListHooks } from "@keystone-6/core/types";
import { notifyNewLesson } from "../notifications/notifyNewLessons";
import { LessonStatus } from "../enums/lesson-status";
import { Statuses } from "../enums/statuses.enum";

export const handleNotificationStudentAndTeacherLesson: ListHooks<Lists.Lesson.TypeInfo>["afterOperation"] =
  async ({ context, item, operation }) => {
    if (operation === "create" && item.statusLesson === LessonStatus.Created) {
      notifyNewLesson(item.id, context);
    }
    if (operation !== "create" && item) {
      const userSubscription = await context.query.UserSubscription.findOne({
        where: { id: item.subscriptionId },
        query: `lastCount`,
      });

      if (userSubscription.lastCount === 0) {
        await context.query.UserSubscription.updateOne({
          where: { id: item.subscriptionId },
          data: { status: Statuses.Finished },
        });
      }

      if (userSubscription.lastCount >= 1) {
        await context.query.UserSubscription.updateOne({
          where: { id: item.subscriptionId },
          data: { status: Statuses.Active },
        });
      }
    }
  };
