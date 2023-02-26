import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { Lists } from '.keystone/types';
import { ClientStatus } from '../enums/client-status.emum';

export const handleCreateUserSubscriptionsAfterOrderPayments: ListHooks<Lists.UserSubscription.TypeInfo>['afterOperation'] =
    async ({ context, item, operation }) => {
        if (operation !== 'delete') {
            const user = await context.query.User.findOne({
                where: { id: `${item.studentId}` },
                query: `id client { id }`
            });
            const client = await context.query.Client.findOne({
                where: { id: `${user.client.id}` },
                query: `statusClient`
            });
            if (item.trial && client.statusClient !== ClientStatus.Client) {
                await context.query.Client.updateOne({
                    where: { id: `${user.client.id}` },
                    data: {
                        statusClient: ClientStatus.PayedFirstLesson
                    }
                });
            } else if (client.statusClient !== ClientStatus.Client) {
                await context.query.Client.updateOne({
                    where: { id: `${user.client.id}` },
                    data: {
                        statusClient: ClientStatus.Client
                    }
                });
            }
        }
    };
