import { Lists } from ".keystone/types";
import { ListHooks } from "@keystone-6/core/types";
import { LessonStatus } from "../enums/lesson-status";
import { areIntervalsOverlapping } from "date-fns";

export const handleCheckBookingLesson: ListHooks<Lists.Lesson.TypeInfo>["validateInput"] =
  async ({ context, resolvedData, addValidationError, item }) => {
    if (resolvedData.startTime && resolvedData.endTime) {
      const lessons = await context.query.Lesson.findMany({
        where: {
          statusLesson: { equals: LessonStatus.Created },
        },
        query: `startTime endTime`,
      });

      lessons.forEach(({ startTime, endTime }) => {
        const check = areIntervalsOverlapping(
          { start: new Date(startTime), end: new Date(endTime) },
          {
            start: new Date(resolvedData.startTime as string),
            end: new Date(resolvedData.endTime as string),
          }
        );
        if (check) {
          addValidationError("Time is not available");
        }
      });
    }
  };
