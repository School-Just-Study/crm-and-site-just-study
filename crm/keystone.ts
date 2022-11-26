import { config } from '@keystone-6/core';
import { lists } from './schemas/lists';
import { createAuth } from '@keystone-6/auth';
import { storage } from './config/storage';
import { db } from './config/db';
import { server } from './config/server';
import { session } from './config/session';
import { extendGraphqlSchema } from './mutations';
import { ui } from './config/ui';

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: { fields: ['name', 'email', 'role', 'password'] },
    sessionData: 'id name email role',
    magicAuthLink: {
        sendToken: async ({ context, token, itemId }) => {
            await context.query.User.updateOne({
                where: { id: `${itemId}` },
                data: { magicLinkToken: token }
            });
        },
        tokensValidForMins: 3
    }
});

export default withAuth(
    config({
        server,
        db,
        lists,
        storage,
        session,
        extendGraphqlSchema,
        ui
    })
);
