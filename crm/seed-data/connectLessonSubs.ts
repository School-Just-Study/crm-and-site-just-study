import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { LessonUpdateInput } from '.keystone/types';
import lessonsWithSub from './lessonsWithSub.json';

export const connectLessonSubs = async (context: KeystoneContext) => {
    const updateLesson = async (id: string, data: LessonUpdateInput) => {
        await context.prisma.Lesson.update({
            where: { id: Number(id) },
            data
        });
        console.log(`✅Updated subscription ${id}`);
    };

    for (const lesson of lessonsWithSub) {
        console.log(`👩 current subscription: ${lesson['id']}`);

        const subscription = lesson['subscription'];

        const data: LessonUpdateInput = {
            subscriptions: {
                // @ts-ignore
                connect: [{ id: +subscription['id'] }]
            }
        };
        console.log('data', JSON.stringify(data));
        await updateLesson(lesson['id'], data);
    }
};
