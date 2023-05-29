import { ListHooks } from '@keystone-6/core/types';
import { notifyLessonCanceled, notifyLessonUpdated, notifyNewLesson } from '../notifications';
import { LessonStatus } from '../enum';

export const handleNotificationStudentAndTeacherLesson: ListHooks<any>['afterOperation'] = async ({
    context,
    item,
    operation
}) => {
    if (operation !== 'delete' && !item.notAlert) {
        if (operation === 'create' && item.statusLesson === LessonStatus.Created) {
            notifyNewLesson(item.id, context);
        }
        if (operation === 'update' && item.statusLesson === LessonStatus.Canceled) {
            notifyLessonCanceled(item.id, context);
        }
        if (operation === 'update' && item.statusLesson === LessonStatus.Created) {
            notifyLessonUpdated(item.id, context);
        }
    }
};
