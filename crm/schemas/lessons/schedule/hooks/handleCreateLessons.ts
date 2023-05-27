import { KeystoneContextFromListTypeInfo, ListHooks } from '@keystone-6/core/types';
import { Lists } from '.keystone/types';
import { checkActive, daysForRepeat, formatWithDateHourMinutes } from '../utils';
import { isAfter, isPast } from 'date-fns';
import { PrepareDateForLessonsType } from '../types';
import { ViewStatus } from '../../../../enums/view-status.enum';

export const syncLessonsWithSchedule = async (
    context: KeystoneContextFromListTypeInfo<Lists.LessonSchedule.TypeInfo>,
    item: Lists.LessonSchedule.Item
) => {
    const lessonSchedule = await context.query.LessonSchedule.findOne({
        where: { id: `${item.id}` },
        query: `schedule { dayOfWeek endTime startTime } teachers { id } students { id }`
    });

    const prepareDateForLessons: PrepareDateForLessonsType[] = lessonSchedule.schedule
        ?.map(({ dayOfWeek, startTime, endTime }: Lists.LessonScheduleItem.Item) =>
            daysForRepeat.map((day) => {
                return {
                    start: formatWithDateHourMinutes(dayOfWeek, day, startTime, item.timeZone),
                    end: formatWithDateHourMinutes(dayOfWeek, day, endTime, item.timeZone)
                };
            })
        )
        .flat()
        .filter(({ start }: PrepareDateForLessonsType) => isAfter(start, new Date(item.startPeriod)))
        .filter(({ end }: PrepareDateForLessonsType) => {
            if (item.endPeriod) return isAfter(new Date(item.endPeriod), end);
            return true;
        });

    if (prepareDateForLessons.length) {
        for (const { start, end } of prepareDateForLessons) {
            const findCreatedLessons = await context.query.Lesson.findMany({
                where: {
                    startTime: { equals: start },
                    endTime: {
                        equals: end
                    },
                    students: {
                        every: {
                            id: {
                                in: lessonSchedule.students.map(({ id }: { id: string }) => Number(id))
                            }
                        }
                    }
                },
                query: `id`
            });

            if (!findCreatedLessons.length) {
                await context.sudo().query.Lesson.createOne({
                    data: {
                        students: {
                            connect: lessonSchedule.students
                        },
                        teachers: {
                            connect: lessonSchedule.teachers
                        },
                        startTime: start,
                        endTime: end,
                        comment: `Создано из графика занятий №${item.id}`,
                        timeZone: item.timeZone,
                        notAlert: true
                    }
                });
            }
        }
    }
};

export const handleCreateLessons: ListHooks<Lists.LessonSchedule.TypeInfo>['afterOperation'] = async ({
    operation,
    context,
    item
}) => {
    if (
        operation !== 'delete' &&
        item.statusView === ViewStatus.Show &&
        checkActive(item?.endPeriod) &&
        isPast(item.startPeriod)
    ) {
        await syncLessonsWithSchedule(context, item);
    }
};