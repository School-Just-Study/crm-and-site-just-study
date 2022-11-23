import { ServerConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import { Roles } from '../enums/roles.enum';

export const getManagers: ServerConfig<any>['extendExpressApp'] = (app, createContext) => {
    app.get('/api/managers', async (req, res) => {
        console.info(new Date(), 'get managers');
        const context = await createContext(req, res);

        const managers = await context.query.User.findMany({
            where: { role: { in: [Roles.Admin, Roles.Manager] } },
            query: `id name email language avatar { image { url } } manager { work teacher }`
        });

        res.send(managers);
        res.end();
    });
};
