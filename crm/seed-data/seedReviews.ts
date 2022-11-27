import reviews from './wpfw_comments.json';
import { ProductReviewCreateInput } from '.keystone/types';
import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';

export const seedReviews = async (context: KeystoneContext) => {
    const createReview = async (reviewData: ProductReviewCreateInput) => {
        await context.query.ProductReview.createOne({
            data: { ...reviewData },
            query: 'id'
        });
    };

    for (const item of reviews) {
        console.log(`👩 Adding review: ${item['comment_author']}`);
        const review = {
            language: 'ru',
            desc: item['comment_content']
        };
        await createReview(review);
    }
};
