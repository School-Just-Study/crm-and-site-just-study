import { LessonStatus } from '../enums/lesson-status';
import { ViewStatus } from '../enums/view-status.enum';
import { KeystoneContext } from '@keystone-6/core/types';
import { Lists } from '.keystone/types';
import { areIntervalsOverlapping } from 'date-fns';

interface Arguments {
  start: string;
  end: string;
  teacherId: string;
}

export const getTeacherSchedule = async (
  root: any,
  { data }: { data: Arguments },
  context: KeystoneContext
) => {
  const { start, end, teacherId } = data;

  const allLessons = (await context.query.Lesson.findMany({
    where: {
      statusLesson: { not: { equals: LessonStatus.Canceled } },
      teachers: { some: { id: { equals: teacherId } } },
    },
    query: `id startTime endTime statusLesson students { id name } burned`,
  })) as Lists.Lesson.Item[];
  const lessons = allLessons?.filter(({ startTime, endTime }) =>
    areIntervalsOverlapping(
      {
        start: new Date(start),
        end: new Date(end),
      },
      { start: new Date(startTime), end: new Date(endTime) }
    )
  );

  const allCutoff = (await context.query.WorkTimeCutoff.findMany({
    where: {
      manager: { id: { equals: teacherId } },
      statusView: { equals: ViewStatus.Show },
    },
    query: `id startTime endTime`,
  })) as Lists.WorkTimeCutoff.Item[];
  const cutoff = allCutoff?.filter(({ startTime, endTime }) =>
    areIntervalsOverlapping(
      {
        start: new Date(start),
        end: new Date(end),
      },
      { start: new Date(startTime), end: new Date(endTime) }
    )
  );

  return {
    lessons,
    cutoff,
  };
};
