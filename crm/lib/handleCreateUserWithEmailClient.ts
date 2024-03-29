import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { Lists } from '.keystone/types';
import { notifyNewClient } from '../notifications/notifyNewClient';

export const handleCreateUserWithEmailClient: ListHooks<Lists.Client.TypeInfo>['afterOperation'] = async ({
    context,
    item,
    operation
}) => {
    if (operation === 'create') {
        notifyNewClient(item, context);
    }
    if (operation !== 'delete') {
        if (item && item.email) {
            const user = await context.query.User.findOne({
                where: { email: item.email },
                query: `id`
            });

            const { name, email, language } = item;

            if (!user) {
                await context.query.User.createOne({
                    data: {
                        name,
                        email,
                        client: { connect: { id: `${item.id}` } },
                        language
                    },
                    query: `id`
                });
            } else {
                await context.query.User.updateOne({
                    where: { email },
                    data: {
                        name,
                        email,
                        client: { connect: { id: `${item.id}` } }
                    },
                    query: `id`
                });
            }
        }
    }
};
