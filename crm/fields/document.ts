import { document } from '@keystone-6/fields-document';
import { componentBlocks } from '../component-blocks';

export const content = document({
    formatting: true,
    dividers: true,
    links: true,
    layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
    ],
    label: 'Содержимое',
    ui: {
        views: './component-blocks'
    },
    componentBlocks
});
