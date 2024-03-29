import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { Lists } from '.keystone/types';
import { transliteration } from './transliteration';

export const handleSlugForPage: ListHooks<Lists.Page.TypeInfo>['resolveInput'] = ({ context, item, resolvedData }) => {
    const title = item?.title || resolvedData?.title;

    if (!item?.slug) {
        const slug = transliteration(title as string);
        return {
            ...resolvedData,
            slug
        };
    }
    return {
        ...resolvedData
    };
};
