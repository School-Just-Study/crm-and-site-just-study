import { Lists } from '.keystone/types';
import { ListHooks } from '@keystone-6/core/types';
import { ViewStatus } from '../enums/view-status.enum';
import { notifyNewReview } from '../notifications/notifyNewReview';

export const handleNotificationManagerNewReview: ListHooks<Lists.ProductReview.TypeInfo>['afterOperation'] = ({
    context,
    item,
    operation
}) => {
    if (operation === 'create' && item.statusView === ViewStatus.Draft) {
        notifyNewReview(item, context);
    }
};
