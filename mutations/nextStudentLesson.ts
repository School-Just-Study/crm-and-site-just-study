import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { LessonStatus } from "../enums/lesson-status";
import { isPast } from "date-fns";
import { Lists } from ".keystone/types";

interface Arguments {
  studentId: string;
}

export const nextStudentLesson = async (
  root: any,
  { studentId }: Arguments,
  context: KeystoneContext
): Promise<Lists.Lesson.Item | null> => {
  const lessons = await context.query.Lesson.findMany({
    where: {
      statusLesson: { equals: LessonStatus.Created },
      students: { some: { id: { equals: studentId } } },
    },
    orderBy: { startTime: "asc" },
    query: `id startTime endTime trial teachers { linkOnlineLesson }`,
  });

  const withOutPast = lessons.filter(
    (lesson) => !isPast(new Date(lesson.endTime))
  );

  const nextLesson = withOutPast[0] as Lists.Lesson.Item;

  if (nextLesson) {
    return {
      ...nextLesson,
      startTime: new Date(nextLesson.startTime),
    };
  } else {
    return null;
  }
};
