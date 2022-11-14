import { AddReviewForm } from '@src/pages/Profile/StudentCabinet/AddReview/types';
import { ProductReviewCreateInput } from '@shared/lib/apollo/types';
import { ViewStatus } from '@shared/enums/view-status';

export const formatData = (data: AddReviewForm, userId?: string, language?: string): ProductReviewCreateInput => {
    return {
        desc: data.desc,
        media: data.media,
        products: { connect: [{ id: data.productId }] },
        student: { connect: { id: userId } },
        statusView: ViewStatus.Draft,
        language
    };
};
